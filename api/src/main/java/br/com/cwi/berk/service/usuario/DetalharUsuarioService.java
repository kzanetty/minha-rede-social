package br.com.cwi.berk.service.usuario;

import br.com.cwi.berk.security.controller.response.UsuarioResponse;
import br.com.cwi.berk.security.mapper.UsuarioMapper;
import br.com.cwi.berk.service.usuario.BuscarUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DetalharUsuarioService {

    @Autowired
    private BuscarUsuarioService buscarUsuarioService;

    public UsuarioResponse detalhar(Long id) {
        return UsuarioMapper.toResponse(buscarUsuarioService.porId(id));
    }
}
