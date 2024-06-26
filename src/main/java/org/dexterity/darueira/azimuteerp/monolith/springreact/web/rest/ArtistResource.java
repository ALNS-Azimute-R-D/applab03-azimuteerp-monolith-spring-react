package org.dexterity.darueira.azimuteerp.monolith.springreact.web.rest;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.dexterity.darueira.azimuteerp.monolith.springreact.repository.ArtistRepository;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.ArtistService;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.ArtistDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link org.dexterity.darueira.azimuteerp.monolith.springreact.domain.Artist}.
 */
@RestController
@RequestMapping("/api/artists")
public class ArtistResource {

    private final Logger log = LoggerFactory.getLogger(ArtistResource.class);

    private static final String ENTITY_NAME = "artist";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ArtistService artistService;

    private final ArtistRepository artistRepository;

    public ArtistResource(ArtistService artistService, ArtistRepository artistRepository) {
        this.artistService = artistService;
        this.artistRepository = artistRepository;
    }

    /**
     * {@code POST  /artists} : Create a new artist.
     *
     * @param artistDTO the artistDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new artistDTO, or with status {@code 400 (Bad Request)} if the artist has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<ArtistDTO> createArtist(@Valid @RequestBody ArtistDTO artistDTO) throws URISyntaxException {
        log.debug("REST request to save Artist : {}", artistDTO);
        if (artistDTO.getId() != null) {
            throw new BadRequestAlertException("A new artist cannot already have an ID", ENTITY_NAME, "idexists");
        }
        artistDTO = artistService.save(artistDTO);
        return ResponseEntity.created(new URI("/api/artists/" + artistDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, artistDTO.getId().toString()))
            .body(artistDTO);
    }

    /**
     * {@code PUT  /artists/:id} : Updates an existing artist.
     *
     * @param id the id of the artistDTO to save.
     * @param artistDTO the artistDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated artistDTO,
     * or with status {@code 400 (Bad Request)} if the artistDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the artistDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ArtistDTO> updateArtist(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ArtistDTO artistDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Artist : {}, {}", id, artistDTO);
        if (artistDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, artistDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!artistRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        artistDTO = artistService.update(artistDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, artistDTO.getId().toString()))
            .body(artistDTO);
    }

    /**
     * {@code PATCH  /artists/:id} : Partial updates given fields of an existing artist, field will ignore if it is null
     *
     * @param id the id of the artistDTO to save.
     * @param artistDTO the artistDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated artistDTO,
     * or with status {@code 400 (Bad Request)} if the artistDTO is not valid,
     * or with status {@code 404 (Not Found)} if the artistDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the artistDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ArtistDTO> partialUpdateArtist(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ArtistDTO artistDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Artist partially : {}, {}", id, artistDTO);
        if (artistDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, artistDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!artistRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ArtistDTO> result = artistService.partialUpdate(artistDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, artistDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /artists} : get all the artists.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of artists in body.
     */
    @GetMapping("")
    public ResponseEntity<List<ArtistDTO>> getAllArtists(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        log.debug("REST request to get a page of Artists");
        Page<ArtistDTO> page;
        if (eagerload) {
            page = artistService.findAllWithEagerRelationships(pageable);
        } else {
            page = artistService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /artists/:id} : get the "id" artist.
     *
     * @param id the id of the artistDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the artistDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ArtistDTO> getArtist(@PathVariable("id") Long id) {
        log.debug("REST request to get Artist : {}", id);
        Optional<ArtistDTO> artistDTO = artistService.findOne(id);
        return ResponseUtil.wrapOrNotFound(artistDTO);
    }

    /**
     * {@code DELETE  /artists/:id} : delete the "id" artist.
     *
     * @param id the id of the artistDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArtist(@PathVariable("id") Long id) {
        log.debug("REST request to delete Artist : {}", id);
        artistService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
