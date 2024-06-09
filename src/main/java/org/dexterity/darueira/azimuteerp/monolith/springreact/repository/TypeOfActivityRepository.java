package org.dexterity.darueira.azimuteerp.monolith.springreact.repository;

import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TypeOfActivity;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the TypeOfActivity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypeOfActivityRepository extends JpaRepository<TypeOfActivity, Long> {}
