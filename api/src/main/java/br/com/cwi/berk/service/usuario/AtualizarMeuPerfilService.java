package br.com.cwi.berk.service.usuario;

import br.com.cwi.berk.controller.request.AtualizarMeuPerfilRequest;
import br.com.cwi.berk.security.controller.response.UsuarioResponse;
import br.com.cwi.berk.security.domain.Usuario;
import br.com.cwi.berk.security.mapper.UsuarioMapper;
import br.com.cwi.berk.security.repository.UsuarioRepository;
import br.com.cwi.berk.service.UsuarioAutenticadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AtualizarMeuPerfilService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioAutenticadoService usuarioAutenticadoService;

    public UsuarioResponse atualizar(AtualizarMeuPerfilRequest request) {
        Usuario usuario = usuarioAutenticadoService.get();

        usuario.setNome(request.getNome());
        usuario.setApelido(request.getApelido());
        usuario.setImageUrl(request.getImageUrl());

        usuarioRepository.save(usuario);

        return UsuarioMapper.toResponse(usuario);
    }
}
