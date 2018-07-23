import { Retro } from "../modules/retro";
import { get, post, remove } from "../services/HttpService";
import { CreateRetro } from "../modules/retroList";

const getRetros = (): Promise<Retro[]> => {
  return get("http://localhost:50880/api/retros").then((result) => {
    return result.value.retros;
  });
};

const createRetro = (request: CreateRetro): Promise<Retro> => {
  return post(`http://localhost:50880/api/retros`, request).then(result => result.value);
};

const deleteRetro = (retroId: string): Promise<void> => {
  return remove(`http://localhost:50880/api/retros/${retroId}`);
};

export const RetroApi = {
  getRetros,
  createRetro,
  deleteRetro,
};