import { instanceAxios } from "../_base/axios.instance";

export async function atualizarUsuarioApi(nome, apelido, imageUrl) {
  let response = await instanceAxios.post("vikings/editar", {
    nome,
    apelido,
    imageUrl,
  });
  return response.data;
}
