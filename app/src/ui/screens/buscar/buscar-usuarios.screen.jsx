import { useEffect, useState } from "react"
import { buscarUsuariosQueNaoSaoMeusAmigosApi, enviarSolicitacaoDeAmizadeApi, buscarSolicitacoesDeAmizadePendentesApi } from "../../../api"
import useGlobalUsuario from "../../../context/usuario/usuario.context";
import { NavListComponent, showToast, UsuarioComponent, ButtonComponent } from "../../components"
import './buscar-usuarios.screen.css'

export function BuscarUsuariosScreen() {
    const [usuario, setUsuario] = useGlobalUsuario();
    const [usuarios, setUsuarios] = useState([])
    const [solicitacoesPendentes, setSolicitacoesPendentes] = useState([])

    async function enviarSolicitacaoDeAmizade(idUsario) {
        try {
            await enviarSolicitacaoDeAmizadeApi(idUsario)
            showToast({ type: "success", message: "Solicitação de amizade enviada." });
            buscarSolicitacoesDeAmizadePendentes()
            buscarSolicitacoesDeAmizadePendentes()
        } catch (error) {
            showToast({ type: "error", message: "Erro ao enviar solicitação de amizade." });

        }
    }

    async function buscarSolicitacoesDeAmizadePendentes() {
        const response = await buscarSolicitacoesDeAmizadePendentesApi()
        console.log(response)
        setSolicitacoesPendentes(response)
    }

    async function buscarUsuariosQueNaoSaoMeusAmigos() {
        const response = await buscarUsuariosQueNaoSaoMeusAmigosApi()
        setUsuarios(response)
    }

    useEffect(() => {
        buscarUsuariosQueNaoSaoMeusAmigos()
        buscarSolicitacoesDeAmizadePendentes()
    }, [])

    function validarSeSolicitacaoDeAmizadeEstaPendente(id) {
        return solicitacoesPendentes.some(amizade => amizade.solicitante.id == id || amizade.recebedor.id == id)
    }

    return (
        <div className="container-screen-buscar">
            <NavListComponent />
            <div className="conteudo-screen-buscar">

                <div className="container-usuarios-disponiveis">
                    {
                        usuarios.map(usuario =>
                            (validarSeSolicitacaoDeAmizadeEstaPendente(usuario.id)) ? null :
                                <div key={usuario.id} className="cards-usuarios-screen-buscar">
                                    <UsuarioComponent usuario={usuario} />
                                    <ButtonComponent onClick={() => enviarSolicitacaoDeAmizade(usuario.id)} texto="Enviar solicitação de amizade" />
                                </div>

                        )
                    }
                </div>
            </div>
        </div>
    )
}