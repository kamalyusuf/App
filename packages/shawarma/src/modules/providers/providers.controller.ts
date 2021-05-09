import { RequestHandler } from "express";
import { Provider } from "./provider.model";
import { IProvider } from "@app/water";

export const create: RequestHandler = async (req, res) => {
  const { label, link, value } = req.body as Omit<IProvider, "id">;

  const provider = await Provider.create({ label, link, value });

  res.send(provider);
};

export const list: RequestHandler = async (req, res) => {
  const providers = await Provider.find().lean();

  const _providers = providers.map((provider) => ({
    id: provider._id,
    ...provider,
    _id: undefined,
    __v: undefined
  }));

  res.send(_providers);
};
