package br.com.cwi.berk.service.amigo;

import br.com.cwi.berk.controller.response.AmigoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EncontrarAmigosService {

    @Autowired
    private ListarAmigosService listarAmigosService;

    public List<AmigoResponse> procurar(String text) {
        List<AmigoResponse> amigos = listarAmigosService.listar();

        return amigos.stream().
                filter(amigo -> amigo.getRecebedor().getNome().contains(text) ||
                        amigo.getRecebedor().getEmail().contains(text) || amigo.getSolicitante().getNome().contains(text) ||
                amigo.getSolicitante().getEmail().contains(text)).collect(Collectors.toList());
    }
}
