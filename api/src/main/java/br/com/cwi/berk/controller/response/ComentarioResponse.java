package br.com.cwi.berk.controller.response;

import br.com.cwi.berk.security.controller.response.UsuarioResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ComentarioResponse {

    private Long id;
    private PostagemResumidaResponse postagem;
    private UsuarioResponse Usuario;
    private String comentario;
}
