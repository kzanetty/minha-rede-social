package br.com.cwi.berk.controller.response;

import br.com.cwi.berk.domain.enums.VisibilidadePublicacao;
import br.com.cwi.berk.security.controller.response.UsuarioResponse;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PostagemResumidaResponse {

        private Long id;
        private UsuarioResponse autor;
        private String descricao;
        private String imageUrl;
        private LocalDateTime dataCriacao;
        private VisibilidadePublicacao visibilidade;
}
