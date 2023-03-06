package br.com.cwi.berk.controller.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class ComentarNaFotoRequest {

    @NotNull
    private Long idUsuario;
    @NotBlank
    private String comentario;
}
