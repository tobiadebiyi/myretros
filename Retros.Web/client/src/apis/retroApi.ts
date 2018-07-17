import { Retro } from "../modules/retro";
import { get, post } from "../services/HttpService";
import { OperationResult } from "../models/OperationResult";

const getRetros = (): Promise<OperationResult<Retro[]>> => {
  return get("http://localhost:50880/api/retros").then((result) => {
    return result.value.retros;
  });
};

const getRetro = (retroId: string): Promise<OperationResult<Retro>> => {
  return get(`http://localhost:50880/api/retros/${retroId}`).then((result) => {
    return result;
  });
};

const createRetro = (retroName: string): Promise<OperationResult<Retro>> => {
  return post(`http://localhost:50880/api/retros`, retroName);
};

export const RetroApi = {
  getRetros,
  getRetro,
  createRetro,
};