import { Retro } from "../modules/retro";
import { get, post } from "../services/HttpService";

const getRetros = (): Promise<Retro[]> => {
  return get("http://localhost:50880/api/retros").then((result) => {
    return result.value.retros;
  });
};

const createRetro = (request: {retroName: string}): Promise<Retro> => {
  return post(`http://localhost:50880/api/retros`, request).then(result => result.value);
};

export const RetroApi = {
  getRetros,
  createRetro,
};