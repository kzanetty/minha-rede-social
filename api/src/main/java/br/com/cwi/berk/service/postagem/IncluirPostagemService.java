package br.com.cwi.berk.service.postagem;

import br.com.cwi.berk.controller.request.IncluirPostagemRequest;
import br.com.cwi.berk.controller.response.PostagemResponse;
import br.com.cwi.berk.domain.Postagem;
import br.com.cwi.berk.mapper.PostagemMapper;
import br.com.cwi.berk.repository.PostagemRepository;
import br.com.cwi.berk.security.domain.Usuario;
import br.com.cwi.berk.service.UsuarioAutenticadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class IncluirPostagemService {

    @Autowired
    private PostagemRepository postagemRepository;

    @Autowired
    private UsuarioAutenticadoService usuarioAutenticadoService;

    public PostagemResponse incluir(IncluirPostagemRequest request) {
        Usuario usuarioAutenticado = usuarioAutenticadoService.get();

        Postagem postagem = PostagemMapper.toEntity(request);
        postagem.setAutor(usuarioAutenticado);
        postagem.setDataCriacao(LocalDateTime.now());

        postagemRepository.save(postagem);

        return PostagemMapper.toResponse(postagem);
    }
}
