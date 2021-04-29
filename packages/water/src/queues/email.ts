import { Queue } from "bullmq";
import { Redis } from "ioredis";
import { IEmailTokenInput, Jobs } from "../types";

const message =
  "Queue is not initialized. Initialize by calling" +
  " `init()`" +
  " method and passing a redis connection";

export class EmailQueue {
  private _redis?: Redis;
  public queueName = "email";
  private _queue?: Queue;

  get queue() {
    this.ensureQueueIsInitialized();

    return this._queue;
  }

  init(redis: Redis) {
    this._redis = redis;
    this._queue = new Queue(this.queueName, { connection: this._redis });
  }

  async queueEmailVerification(data: IEmailTokenInput) {
    this.ensureQueueIsInitialized();
    await this._queue!.add(Jobs.EMAIL_VERIFICATION, data, {
      removeOnComplete: true
    });
  }

  async queueForgotPassword(data: IEmailTokenInput) {
    this.ensureQueueIsInitialized();
    await this._queue!.add(Jobs.FORGOT_PASSWORD, data, {
      removeOnComplete: true
    });
  }

  ensureQueueIsInitialized() {
    if (!this._queue) {
      throw new Error(message);
    }
  }
}
