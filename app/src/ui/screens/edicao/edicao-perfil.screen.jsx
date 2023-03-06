import { useEffect, useState } from "react";
import { atualizarUsuarioApi } from "../../../api/editar-usuario/editar-usuario.api";
import useGlobalUsuario from "../../../context/usuario/usuario.context";
import { NavListComponent, ButtonComponent, showToast } from "../../components";
import './edicao-perfil.screen.css'

export function EditarPerfilScreen() {
    const [usuario, setUsuario] = useGlobalUsuario();
    const [visivel, setVisivel] = useState(false)

    const [nome, setNome] = useState(usuario?.nome ? usuario?.nome : null)
    const [apelido, setApelido] = useState(usuario?.apelido ? usuario?.apelido : null)
    const [imagem, setImagem] = useState(usuario?.imageUrl ? usuario?.imageUrl : null)

    async function handleSubmit(event) {
        event.preventDefault();
        if (validate(nome, usuario.nome, apelido, usuario.apelido, imagem, usuario.imageUrl)) {
            try {
                const response = await atualizarUsuarioApi(nome, apelido, imagem)
                setVisivel(true)
                showToast({ type: "success", message: "Alteração realizada com sucesso" });
                setUsuario(response)
            } catch (error) {
                showToast({ type: "error", message: "Erro ao tentar alterar dados do usuario" });
            }
        }
    }

    function validate(nome, nomeUsuario, apelido, apelidoUsuario, imagem, imagemUsuario) {
        return (validacao(nome) && validacao(apelido) && validacao(imagem)) &&
            validateRepeticao(nome, nomeUsuario, apelido, apelidoUsuario, imagem, imagemUsuario)
    }

    function validacao(dado) {
        if (dado == null) {
            showToast({ type: "error", message: "Os campos não podem estar vazios." });
            return false
        }
        if (dado.length < 1) {
            showToast({ type: "error", message: "Você deve preencher todas informações" });
            return false
        }
        if (dado = "") {
            showToast({ type: "error", message: "Você deve preencher todas informações" });
            return false
        }
        return true
    }

    function validateRepeticao(nome, nomeUsuario, apelido, apelidoUsuario, imagem, imagemUsuario) {
        if (nome === nomeUsuario && apelido === apelidoUsuario && imagem === imagemUsuario) {
            showToast({ type: "error", message: "Você não está alterando nada" });
            return false
        }
        return true
    }


    return (
        <div className="container-screen-editar">
            <NavListComponent />
            <div className="container-formulario">
                <form onSubmit={handleSubmit} className="formulario-alterar-usuario">
                    <div className="field nome">
                        <label htmlFor="nome" className="label-input-edicao">Nome </label>
                        <input
                            className="input-formulario"
                            id="nome"
                            type="text"
                            name="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Informe o nome."
                        />
                    </div>

                    <div className="field apelido">
                        <label htmlFor="apelido" className="label-input-edicao">Apelido </label>
                        <input
                            className="input-formulario"
                            id="apelido"
                            type="text"
                            name="apelido"
                            value={apelido}
                            onChange={(e) => setApelido(e.target.value)}
                            placeholder="Informe o apelido."
                        />
                    </div>


                    <div className="field imagem">
                        <label htmlFor="imagem" className="label-input-edicao">URL imagem </label>
                        <input
                            className="input-formulario"
                            id="imagem"
                            type="text"
                            name="imagem"
                            value={imagem}
                            onChange={(e) => setImagem(e.target.value)}
                            placeholder="Informe a url da imagem."
                        />
                    </div>
                    {/* <div className="field imagem">
                        <label htmlFor="imagem">Url da imagem </label>
                        <textarea
                            className="textarea-formulario"
                            id="imagem"
                            name="imagem"
                            rows="4"
                            cols="50"
                            placeholder="URL da imagem"
                            value={imagem}
                            onChange={(e) => setImagem(e.target.value)}
                        ></textarea>
                    </div> */}
                    {
                        (visivel) ? <p className="color-green">Usuario alterado</p> : null
                    }
                    <ButtonComponent texto="Alterar" />
                </form>
            </div>
        </div>
    )
}