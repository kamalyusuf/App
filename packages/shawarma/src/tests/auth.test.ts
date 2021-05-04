import supertest from "supertest";
import { app } from "../app";
import { emailQueue } from "../lib/email-queue";
import { User } from "../models/User";

const request = supertest.agent(app);

jest.mock("../lib/email-queue");

describe("signup", () => {
  it("should signup successfully", async () => {
    await request
      .post("/api/auth/signup")
      .send({
        email: "test@yahoo.com",
        password: "test__test"
      })
      .expect(201);
  });

  it("should not signup with an invalid email", async () => {
    const res = await request
      .post("/api/auth/signup")
      .send({
        email: "t.com",
        password: "test__test"
      })
      .expect(422);

    expect(res.body.errors[0].message).toEqual("Invalid email");
  });

  it("should not signup with an invalid password", async () => {
    const res = await request
      .post("/api/auth/signup")
      .send({
        email: "test@yahoo.com",
        password: "t"
      })
      .expect(422);

    expect(res.body.errors[0].message).toEqual(
      "Password must be at least 8 characters"
    );
  });

  it("should queue an email verification", async () => {
    await request
      .post("/api/auth/signup")
      .send({
        email: "test@yahoo.com",
        password: "test__test"
      })
      .expect(201);

    expect(emailQueue.queueEmailVerification).toHaveBeenCalled();
  });

  it("should set cookie after successful signup", async () => {
    const response = await request
      .post("/api/auth/signup")
      .send({
        email: "test@yahoo.com",
        password: "test__test"
      })
      .expect(201);

    expect(response.get("Set-Cookie")).toBeDefined();
  });

  it("should disallow signup if we're signed in", async () => {
    await request
      .post("/api/auth/signup")
      .send({
        email: "test@yahoo.com",
        password: "test__test"
      })
      .expect(201);

    await request
      .post("/api/auth/signup")
      .send({
        email: "test@yahoo.com",
        password: "test__test"
      })
      .expect(401);
  });

  it("should disallow duplicate emails", async () => {
    await request
      .post("/api/auth/signup")
      .send({
        email: "test@yahoo.com",
        password: "test__test"
      })
      .expect(201);

    await request.post("/api/auth/signout").send({}).expect(200);

    await request
      .post("/api/auth/signup")
      .send({
        email: "test@yahoo.com",
        password: "test__test"
      })
      .expect(400);
  });
});

describe("signin", () => {
  it("should not signin with an invalid email", async () => {
    await request
      .post("/api/auth/signup")
      .send({
        email: "test@yahoo.com",
        password: "test__test"
      })
      .expect(201);

    await request.post("/api/auth/signout").send({}).expect(200);

    const res = await request
      .post("/api/auth/signin")
      .send({
        email: "t.com",
        password: "test__test"
      })
      .expect(422);

    expect(res.body.errors[0].message).toEqual("Invalid email");
  });

  it("should not signin if user does not exist", async () => {
    await request
      .post("/api/auth/signin")
      .send({
        email: "human@yahoo.com",
        password: "test__test"
      })
      .expect(404);
  });

  it("should not signin if password is incorrect", async () => {
    await request
      .post("/api/auth/signup")
      .send({
        email: "test@yahoo.com",
        password: "test__test"
      })
      .expect(201);

    await request.post("/api/auth/signout").send({}).expect(200);

    const res = await request
      .post("/api/auth/signin")
      .send({
        email: "test@yahoo.com",
        password: "wrong_password_here"
      })
      .expect(422);

    expect(res.body.errors[0].message).toEqual("Incorrect password");
  });

  it("should signin successfully and set cookie", async () => {
    await request
      .post("/api/auth/signup")
      .send({
        email: "test@yahoo.com",
        password: "test__test"
      })
      .expect(201);

    await request.post("/api/auth/signout").send({}).expect(200);

    const response = await request
      .post("/api/auth/signin")
      .send({
        email: "test@yahoo.com",
        password: "test__test"
      })
      .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});

describe("signout", () => {
  it("should signout successfully", async () => {
    await request
      .post("/api/auth/signup")
      .send({
        email: "test@yahoo.com",
        password: "test__test"
      })
      .expect(201);

    await request.post("/api/auth/signout").send({}).expect(200);
  });
});

describe("verify", () => {
  it("should set user password reset token and queue forgot password email", async () => {
    await request
      .post("/api/auth/signup")
      .send({
        email: "test@yahoo.com",
        password: "test__test"
      })
      .expect(201);

    await request.post("/api/auth/signout").send({}).expect(200);

    await request
      .post("/api/auth/forgot")
      .send({ email: "test@yahoo.com" })
      .expect(200);

    const user = await User.findOne({ email: "test@yahoo.com" }).select(
      "password_reset_token"
    );

    expect(user).toHaveProperty("password_reset_token");
    expect(emailQueue.queueForgotPassword).toHaveBeenCalled();
  });
});
