import { UsuarioComponent } from ".."
import { ButtonComponent } from "../button/button.component"
import "./solicitacao-amizade.component.css"

export function SolicitacoesDeAmizadeComponent({ solicitacoes, aceitarPedidoDeAmizade, rejeitarPedidoDeAmizade }) {

    return (
        <div className="container-card-amizade">
            {
                solicitacoes?.map(solicitacao =>
                    <div key={solicitacao.id} className="card-amizade">
                        <UsuarioComponent
                            key={solicitacao.id}
                            usuario={solicitacao.solicitante}
                        />
                        <div className="buttons-amizade">
                            <ButtonComponent onClick={() => aceitarPedidoDeAmizade(solicitacao.id)} texto="aceitar" />
                            <ButtonComponent onClick={() => rejeitarPedidoDeAmizade(solicitacao.id)} texto="Rejeitar" />
                        </div>

                    </div>
                )
            }
        </div>
    )
}