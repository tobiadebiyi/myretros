import { Retro } from "../modules/retro";
import { get } from "../services/HttpService";

const getRetros = (): Promise<Retro[]> => {
  return get("http://localhost:5000/api/retros").then((retros) => {
    return retros;
  });
};

const getRetro = (retroId: string): Promise<Retro> => {
  return get(`http://localhost:5000/api/retros/${retroId}`).then((retro) => {
    return retro;
  });
};

export const RetroApi = {
  getRetros,
  getRetro,
};