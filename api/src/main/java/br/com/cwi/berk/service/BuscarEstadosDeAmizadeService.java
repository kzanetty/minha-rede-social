package br.com.cwi.berk.service;

import br.com.cwi.berk.domain.Amigo;
import br.com.cwi.berk.domain.enums.AmizadeStatus;
import br.com.cwi.berk.repository.AmigoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BuscarEstadosDeAmizadeService {

    @Autowired
    private AmigoRepository amigoRepository;

    @Autowired
    private UsuarioAutenticadoService usuarioAutenticadoService;

//    public List<Amigo> todasInteracoesDeAmizadeQueUsuarioEstaEnvolvido() {
//        Long idUsuarioAutenticado = usuarioAutenticadoService.getId();
//
//        List<Amigo> todasInteracoesDisponiveis = amigoRepository.findAll();
//        todasInteracoesDisponiveis.stream().filter(amigo -> amigo.getSolicitante().getId() == idUsuarioAutenticado || amigo.getRecebedor().getId() == idUsuarioAutenticado).collect(Collectors.toList());
//
//        return todasInteracoesDisponiveis;
//    }

    public List<Amigo> todasMinhasSolicitacoesDeAmizadePendentes() {
        Long idUsuarioAutenticado = usuarioAutenticadoService.getId();

        List<Amigo> todasInteracoesDisponiveis = amigoRepository.findAll();
        todasInteracoesDisponiveis.stream().filter(amigo -> (amigo.getSolicitante().getId() == idUsuarioAutenticado || amigo.getRecebedor().getId() == idUsuarioAutenticado) && amigo.getStatus() == AmizadeStatus.PENDENTE).collect(Collectors.toList());

        return todasInteracoesDisponiveis;
    }

    public List<Amigo> todasInteracoesDeAmizadeQueUsuarioEstaEnvolvido() {
        Long idUsuarioAutenticado = usuarioAutenticadoService.getId();
        List<Amigo> todasInteracoesDisponiveis = amigoRepository.findAll();

        List<Amigo> novaListaComInteracoesDoUsuarioAutenticado = new ArrayList<>();

        for(Amigo amigo: todasInteracoesDisponiveis) {
            if(amigo.getSolicitante().getId() == idUsuarioAutenticado || amigo.getRecebedor().getId() == idUsuarioAutenticado) {
                novaListaComInteracoesDoUsuarioAutenticado.add(amigo);
            }
        }

        return novaListaComInteracoesDoUsuarioAutenticado;
    }
}
