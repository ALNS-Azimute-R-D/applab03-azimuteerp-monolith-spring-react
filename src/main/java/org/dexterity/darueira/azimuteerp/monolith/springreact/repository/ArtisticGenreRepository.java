package org.dexterity.darueira.azimuteerp.monolith.springreact.repository;

import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.ArtisticGenre;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ArtisticGenre entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArtisticGenreRepository extends JpaRepository<ArtisticGenre, Long> {}
