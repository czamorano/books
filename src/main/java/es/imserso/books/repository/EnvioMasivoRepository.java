package es.imserso.books.repository;

import es.imserso.books.domain.EnvioMasivo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the EnvioMasivo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EnvioMasivoRepository extends JpaRepository<EnvioMasivo, Long> {}
