package br.com.cwi.berk.mapper;

import br.com.cwi.berk.controller.request.IncluirPostagemRequest;
import br.com.cwi.berk.controller.response.PostagemResponse;
import br.com.cwi.berk.controller.response.PostagemResumidaResponse;
import br.com.cwi.berk.domain.Postagem;
import br.com.cwi.berk.security.mapper.UsuarioMapper;

import static java.util.Objects.isNull;
import static java.util.stream.Collectors.toList;

public class PostagemMapper {

    public static Postagem toEntity(IncluirPostagemRequest request) {
        if (isNull(request)) {
            return new Postagem();
        }
        Postagem postagem = new Postagem();
        postagem.setDescricao(request.getDescricao());
        postagem.setImageUrl(request.getImageUrl());
        postagem.setVisibilidade(request.getVisibilidade());
        return postagem;
    }

    public static PostagemResponse toResponse(Postagem postagem) {
        if (isNull(postagem)) {
            return new PostagemResponse();
        }
        return PostagemResponse.builder()
                .autor(UsuarioMapper.toResponse(postagem.getAutor()))
                .id(postagem.getId())
                .descricao(postagem.getDescricao())
                .imageUrl(postagem.getImageUrl())
                .dataCriacao(postagem.getDataCriacao())
                .visibilidade(postagem.getVisibilidade())
                .comentarios(postagem.getComentarios().stream().map(ComentarioMapper::toResponse).collect(toList()))
                .curtidas(postagem.getCurtidas().stream().map(UsuarioMapper::toResponse).collect(toList()))
                .build();
    }

    public static PostagemResumidaResponse toResponseResumido(Postagem postagem) {
        if (isNull(postagem)) {
            return new PostagemResumidaResponse();
        }
        return PostagemResumidaResponse.builder()
                .autor(UsuarioMapper.toResponse(postagem.getAutor()))
                .id(postagem.getId())
                .descricao(postagem.getDescricao())
                .imageUrl(postagem.getImageUrl())
                .dataCriacao(postagem.getDataCriacao())
                .visibilidade(postagem.getVisibilidade())
                .build();
    }
}
