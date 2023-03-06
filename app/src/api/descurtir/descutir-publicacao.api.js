import { instanceAxios } from "../_base/axios.instance";

export async function descurtirPublicacaoApi(idPostagem) {
  let response = await instanceAxios.post(`/postagens/descurtir/${idPostagem}`);
  return response.data;
}
