package br.com.cwi.berk.controller.response;

import br.com.cwi.berk.domain.enums.AmizadeStatus;
import br.com.cwi.berk.security.controller.response.UsuarioResponse;
import br.com.cwi.berk.security.domain.Usuario;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AmigoResponse {

    private Long id;
    private UsuarioResponse solicitante;
    private UsuarioResponse recebedor;
    private AmizadeStatus status;
}
