import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscarSolicitacoesDeAmizadeApi } from "../../../api/solicitacao-amizade/solicitacao-amizade.api";
import { NavListComponent, SolicitacoesDeAmizadeComponent, TimelineComponent, UsuarioComponent } from "../../components";
import { ButtonComponent } from "../../components/button/button.component";
import useGlobalUsuario from "../../../context/usuario/usuario.context";
import './perfil.screen.css'
import { aceitarPedidoDeAmizadeApi, rejeitarPedidoDeAmizadeApi } from "../../../api"




export function PerfilScreen() {
    const [usuario, setUsuario] = useGlobalUsuario();
    const [solicitacoes, setSolicitacoes] = useState(null)
    const [visibilidade, setVisibilidade] = useState(false)

    const navigate = useNavigate();


    async function buscarSolicitacoesDeAmizade() {
        const response = await buscarSolicitacoesDeAmizadeApi()
        setSolicitacoes(response)
    }

    async function aceitarPedidoDeAmizade(idAmizade) {
        await aceitarPedidoDeAmizadeApi(idAmizade)
        buscarSolicitacoesDeAmizade()
    }

    async function rejeitarPedidoDeAmizade(idAmizade) {
        await rejeitarPedidoDeAmizadeApi(idAmizade)
        buscarSolicitacoesDeAmizade()
    }

    function mostrar() {
        setVisibilidade(true)
    }

    function esconder() {
        setVisibilidade(false)
    }

    useEffect(() => {
        buscarSolicitacoesDeAmizade()
    }, [])







    return (
        <>
            <NavListComponent />
            <div className="informacoes-iniciais-perfil-screen">
                <div className="interações">
                    <ButtonComponent onClick={() => navigate('../edit')} texto="Editar perfil" />
                    <ButtonComponent onClick={() => navigate('../friends')} texto="Mostrar amigos" />
                    {
                        (!visibilidade) ?
                            <ButtonComponent onClick={() => mostrar()} texto="Mostrar solicitações de amizade" />
                            :
                            <ButtonComponent onClick={() => esconder()} texto="Ocultar solicitações" />
                    }
                </div>
                <UsuarioComponent usuario={usuario} />
            </div>
            {
                (visibilidade) ?
                    <SolicitacoesDeAmizadeComponent
                        solicitacoes={solicitacoes}
                        aceitarPedidoDeAmizade={aceitarPedidoDeAmizade}
                        rejeitarPedidoDeAmizade={rejeitarPedidoDeAmizade} />
                    : null
            }
            <TimelineComponent />
        </>
    )
}