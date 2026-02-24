package es.imserso.books.repository;

import es.imserso.books.domain.OrganismoEmisor;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the OrganismoEmisor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrganismoEmisorRepository extends JpaRepository<OrganismoEmisor, Long> {}
