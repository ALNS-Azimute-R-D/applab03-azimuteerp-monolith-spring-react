package org.dexterity.darueira.azimuteerp.monolith.springreact.service;

import java.util.Optional;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.OrderItemDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link org.dexterity.darueira.azimuteerp.monolith.springreact.domain.OrderItem}.
 */
public interface OrderItemService {
    /**
     * Save a orderItem.
     *
     * @param orderItemDTO the entity to save.
     * @return the persisted entity.
     */
    OrderItemDTO save(OrderItemDTO orderItemDTO);

    /**
     * Updates a orderItem.
     *
     * @param orderItemDTO the entity to update.
     * @return the persisted entity.
     */
    OrderItemDTO update(OrderItemDTO orderItemDTO);

    /**
     * Partially updates a orderItem.
     *
     * @param orderItemDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<OrderItemDTO> partialUpdate(OrderItemDTO orderItemDTO);

    /**
     * Get all the orderItems.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<OrderItemDTO> findAll(Pageable pageable);

    /**
     * Get all the orderItems with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<OrderItemDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" orderItem.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<OrderItemDTO> findOne(Long id);

    /**
     * Delete the "id" orderItem.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
