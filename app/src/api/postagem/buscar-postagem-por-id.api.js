import { instanceAxios } from "../_base/axios.instance";

export async function buscarPostagemPorIdApi(idPostagem) {
  let response = await instanceAxios.get(`/postagens/buscar/${idPostagem}`);
  return response.data;
}
