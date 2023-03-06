package br.com.cwi.berk.service.amigo;

import br.com.cwi.berk.domain.Amigo;
import br.com.cwi.berk.repository.AmigoRepository;
import br.com.cwi.berk.service.amigo.BuscarEstadosDeAmizadeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class BuscarSolicitacaoDeAmizadeService {

    @Autowired
    private AmigoRepository amigoRepository;

    @Autowired
    private BuscarEstadosDeAmizadeService buscarEstadosDeAmizadeService;

    public Amigo porId(Long id) {
        return amigoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Pedido inexistente."));
    }

    public Amigo porUsuarios(Long idRecebedor) {
        List<Amigo> interacoesDeAmizadeExistentesComEsseUsuario = buscarEstadosDeAmizadeService.todasInteracoesDeAmizadeQueUsuarioEstaEnvolvido();

        for(Amigo amigo : interacoesDeAmizadeExistentesComEsseUsuario) {
            if(amigo.getSolicitante().getId() == idRecebedor || amigo.getRecebedor().getId() == idRecebedor) {
                return amigo;
            }
        }
        return new Amigo();
    }
}

