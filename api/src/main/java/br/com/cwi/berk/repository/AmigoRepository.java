package br.com.cwi.berk.repository;

import br.com.cwi.berk.domain.Amigo;
import br.com.cwi.berk.security.domain.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AmigoRepository extends JpaRepository<Amigo, Long> {
}
