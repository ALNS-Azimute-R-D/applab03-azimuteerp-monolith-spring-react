package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.DistrictAsserts.*;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.DistrictTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DistrictMapperTest {

    private DistrictMapper districtMapper;

    @BeforeEach
    void setUp() {
        districtMapper = new DistrictMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getDistrictSample1();
        var actual = districtMapper.toEntity(districtMapper.toDto(expected));
        assertDistrictAllPropertiesEquals(expected, actual);
    }
}
