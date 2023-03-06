package br.com.cwi.berk.mapper;

import br.com.cwi.berk.controller.response.ComentarioResponse;
import br.com.cwi.berk.domain.Comentario;
import br.com.cwi.berk.security.mapper.UsuarioMapper;

public class ComentarioMapper {


    public static ComentarioResponse toResponse(Comentario comentario) {
        ComentarioResponse comentarioResponse = new ComentarioResponse();
        comentarioResponse.setId(comentario.getId());
        comentarioResponse.setUsuario(UsuarioMapper.toResponse(comentario.getUsuario()));
        comentarioResponse.setPostagem(PostagemMapper.toResponseResumido(comentario.getPostagem()));
        comentarioResponse.setComentario(comentario.getComentario());
        return comentarioResponse;
    }
}
