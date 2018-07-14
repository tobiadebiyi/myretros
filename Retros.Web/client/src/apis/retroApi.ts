import { Retro } from "../modules/retro";
import { get } from "../services/HttpService";
import { OperationResult } from "../models/OperationResult";

const getRetros = (): Promise<OperationResult<Retro[]>> => {
  return get("http://localhost:50880/api/retros").then((retros) => {
    return retros;
  });
};

const getRetro = (retroId: string): Promise<OperationResult<Retro>> => {
  return get(`http://localhost:50880/api/retros/${retroId}`).then((retro) => {
    return retro;
  });
};

export const RetroApi = {
  getRetros,
  getRetro,
};