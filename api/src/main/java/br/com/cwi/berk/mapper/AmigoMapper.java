package br.com.cwi.berk.mapper;

import br.com.cwi.berk.controller.response.AmigoResponse;
import br.com.cwi.berk.domain.Amigo;
import br.com.cwi.berk.security.mapper.UsuarioMapper;

import static java.util.Objects.isNull;

public class AmigoMapper {

    public static AmigoResponse toResponse(Amigo amigo) {
        if (isNull(amigo)) {
            return AmigoResponse.builder().build();
        }
        return AmigoResponse.builder()
                .id(amigo.getId())
                .recebedor(UsuarioMapper.toResponse(amigo.getRecebedor()))
                .solicitante(UsuarioMapper.toResponse(amigo.getSolicitante()))
                .status(amigo.getStatus())
                .build();
    }
}
