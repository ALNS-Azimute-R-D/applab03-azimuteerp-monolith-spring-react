package org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.dexterity.darueira.azimuteerp.monolith.springreact.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class InventoryTransactionDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(InventoryTransactionDTO.class);
        InventoryTransactionDTO inventoryTransactionDTO1 = new InventoryTransactionDTO();
        inventoryTransactionDTO1.setId(1L);
        InventoryTransactionDTO inventoryTransactionDTO2 = new InventoryTransactionDTO();
        assertThat(inventoryTransactionDTO1).isNotEqualTo(inventoryTransactionDTO2);
        inventoryTransactionDTO2.setId(inventoryTransactionDTO1.getId());
        assertThat(inventoryTransactionDTO1).isEqualTo(inventoryTransactionDTO2);
        inventoryTransactionDTO2.setId(2L);
        assertThat(inventoryTransactionDTO1).isNotEqualTo(inventoryTransactionDTO2);
        inventoryTransactionDTO1.setId(null);
        assertThat(inventoryTransactionDTO1).isNotEqualTo(inventoryTransactionDTO2);
    }
}
