import { useState } from "react";
import { NavListComponent } from "../../components"
import { CriarContaApi } from "../../../api/criar-conta/criar.conta.api";
import { ButtonComponent, showToast } from "../../components";
import useGlobalUsuario from "../../../context/usuario/usuario.context";
import './create-account.screen.css'
import { useNavigate } from "react-router-dom";

export function CreateAccountScreen() {
    const [nome, setNome] = useState(null);
    const [email, setEmail] = useState(null);
    const [senha, setSenha] = useState(null);
    const [apelido, setApelido] = useState(null);
    const [dataNascimento, setDataNascimento] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const navigate = useNavigate()

    const [usuario, setUsuario] = useGlobalUsuario();

    async function criarConta() {
        if (validacoes(nome, email, senha, dataNascimento)) {
            try {
                const response = await CriarContaApi({ nome, email, apelido, dataNascimento, imageUrl, senha })
                setUsuario(response);
                showToast({ type: "success", message: "Personagem criado com sucesso." });
                navigate('/profile')
            } catch (error) {
                showToast({ type: "error", message: error.response.data.message });
            }
        }
    }

    function validacoes(nome, email, senha, dataNascimento) {
        if (nome == null || nome == "") {
            showToast({ type: "error", message: "O nome é obrigatório." });
            return false
        }
        if (email == null || nome == "") {
            showToast({ type: "error", message: "O email é obrigatório." });
            return false
        }
        if (senha == null || nome == "") {
            showToast({ type: "error", message: "A senha é obrigatória." });
            return false
        }
        if (dataNascimento == null || nome == "") {
            showToast({ type: "error", message: "A dataNascimento é obrigatória." });
            return false
        }
        return true;
    }

    return (
        <>
            <NavListComponent />
            <div className="container-formulario-criar-conta">
                <h1>Cadastro</h1>

                <div className="formulario-criar-conta">

                    <div className="nome field-criar-conta">
                        <label htmlFor="nome">Nome: </label>
                        <input
                            className="input-formulario"
                            id="nome"
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    <div className="email field-criar-conta">
                        <label htmlFor="email">Email: </label>
                        <input
                            className="input-formulario"
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="senha field-criar-conta">
                        <label htmlFor="senha">Senha: </label>
                        <input
                            className="input-formulario"
                            id="senha"
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>

                    <div className="apelido field-criar-conta">
                        <label htmlFor="apelido">Apelido: </label>
                        <input
                            className="input-formulario"
                            id="apelido"
                            type="text"
                            value={apelido}
                            onChange={(e) => setApelido(e.target.value)}
                        />
                    </div>
                    <div className="imageUrl field-criar-conta">
                        <label htmlFor="imageUrl">url da imagem: </label>
                        <input
                            className="input-formulario"
                            id="imageUrl"
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </div>

                    <div className="dataNascimento field-criar-conta">
                        <label htmlFor="dataNascimento">Data nascimento: </label>
                        <input
                            className="input-formulario"
                            id="dataNascimento"
                            type="date"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
                        />
                    </div>


                    <div className="button-criar-conta">
                        <ButtonComponent onClick={criarConta} texto="criar" />
                    </div>
                </div>
            </div>
        </>
    )
}