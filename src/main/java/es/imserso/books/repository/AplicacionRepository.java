package es.imserso.books.repository;

import es.imserso.books.domain.Aplicacion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Aplicacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AplicacionRepository extends JpaRepository<Aplicacion, Long> {}
