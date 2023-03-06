import { useEffect, useState } from 'react'
import { buscarPostagemPorIdApi, curtiPublicacaoApi, descurtirPublicacaoApi } from '../../../api'
import { adicionarComentarioApi } from '../../../api/comentario/comentar.api'
import useGlobalUsuario from '../../../context/usuario/usuario.context'
import './CardPostagem.component.css'


export function CardPostagem({ postagem }) {
    const [comentario, setComentario] = useState("")
    const [usuario, setUsuario] = useGlobalUsuario();
    const [curtidas, setCurtidas] = useState(postagem.curtidas.length)

    async function curtir(idPostagem) {
        const postagem = await buscarPostagemPorIdApi(idPostagem)
        const estado = postagem.curtidas.find(curtida => curtida.id == usuario.id)
        if (estado) {
            await descurtirPublicacaoApi(idPostagem)
            setCurtidas(oldCurtidas => oldCurtidas - 1)
        } else {
            await curtiPublicacaoApi(idPostagem)
            setCurtidas(oldCurtidas => oldCurtidas + 1)
        }
    }

    async function comentar(idPostagem) {
        await adicionarComentarioApi(usuario.id,
            idPostagem,
            comentario)
    }

    return (
        <div className='card-postagem'>
            <p className='visibilidade-postagem'>{postagem?.visibilidade}</p>
            <img src={postagem?.imageUrl} alt="" className='imagem-postagem' />
            <p className='descricao-postagem'>{postagem?.descricao}</p>
            <div className="comentarios">
                {
                    postagem.comentarios.map(comentario =>
                        <p>{comentario.usuario.nome} comentou: {comentario.comentario}</p>)
                }
            </div>

            <div className='icon-like-numero'>
                <img src="https://www.freepnglogos.com/uploads/like-png/like-icon-line-iconset-iconsmind-35.png" alt="" className='image-like' />
                <p>{curtidas}</p>
            </div>

            <div className='interacoes-card-postagem'>
                <input
                    className="input-formulario"
                    id="comentario"
                    type="text"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    placeholder="Escreva seu comentario aqui"
                />
                <div className='buttons-card-postagem'>
                    <button className="button-like" onClick={() => curtir(postagem.id)}>Like</button>
                    <button className="button-comentario" onClick={() => comentar(postagem.id)}>comentar</button>

                </div>
            </div>

        </div>
    )
}