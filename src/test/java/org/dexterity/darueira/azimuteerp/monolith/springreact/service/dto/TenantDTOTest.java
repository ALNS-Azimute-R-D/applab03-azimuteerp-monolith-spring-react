package org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.dexterity.darueira.azimuteerp.monolith.springreact.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TenantDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TenantDTO.class);
        TenantDTO tenantDTO1 = new TenantDTO();
        tenantDTO1.setId(1L);
        TenantDTO tenantDTO2 = new TenantDTO();
        assertThat(tenantDTO1).isNotEqualTo(tenantDTO2);
        tenantDTO2.setId(tenantDTO1.getId());
        assertThat(tenantDTO1).isEqualTo(tenantDTO2);
        tenantDTO2.setId(2L);
        assertThat(tenantDTO1).isNotEqualTo(tenantDTO2);
        tenantDTO1.setId(null);
        assertThat(tenantDTO1).isNotEqualTo(tenantDTO2);
    }
}
