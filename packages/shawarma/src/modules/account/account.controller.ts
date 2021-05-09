import { RequestHandler } from "express";
import { Account } from "../account";
import { BadRequestError, NotFoundError } from "../../lib";
import { IOAuth } from "@app/water";

export const retrieve: RequestHandler = async (req, res) => {
  const account = await Account.findOne({ user: req.user?.id }).populate(
    "user"
  );
  if (!account) {
    throw new NotFoundError("Account does not exist");
  }

  res.send(account);
};

export const unlinkProvider: RequestHandler = async (req, res) => {
  let provider = (req.query.provider as string).toLowerCase();
  if (!provider) {
    throw new BadRequestError("Missing provider");
  }

  if (!(Object.values(IOAuth) as string[]).includes(provider)) {
    throw new BadRequestError("Provider not supported");
  }

  const account = await Account.findOne({ user: req.user?.id }).populate(
    "user"
  );
  if (!account) {
    throw new NotFoundError("Account does not exist");
  }

  if (!(account as any)[provider + "_id"]) {
    throw new BadRequestError("Account not linked");
  }

  (account as any)[provider + "_id"] = undefined;
  account.tokens = account.tokens.filter((token) => token.kind !== provider);
  await account.save();

  res.send(account);
};
