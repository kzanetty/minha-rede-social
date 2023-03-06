package br.com.cwi.berk.service.postagem;

import br.com.cwi.berk.domain.Postagem;
import br.com.cwi.berk.repository.PostagemRepository;
import br.com.cwi.berk.security.domain.Usuario;
import br.com.cwi.berk.service.UsuarioAutenticadoService;
import br.com.cwi.berk.service.postagem.BuscarPostagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CurtirPostagemService {


    @Autowired
    private PostagemRepository postagemRepository;

    @Autowired
    private UsuarioAutenticadoService usuarioAutenticadoService;

    @Autowired
    private BuscarPostagemService buscarPostagemService;


    public void curtir(Long idPostagem) {
        Usuario usuarioAutenticado = usuarioAutenticadoService.get();
        Postagem postagem = buscarPostagemService.porId(idPostagem);

        postagem.getCurtidas().add(usuarioAutenticado);

        postagemRepository.save(postagem);
    }
}
