package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TypeOfActivityAsserts.*;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TypeOfActivityTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TypeOfActivityMapperTest {

    private TypeOfActivityMapper typeOfActivityMapper;

    @BeforeEach
    void setUp() {
        typeOfActivityMapper = new TypeOfActivityMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getTypeOfActivitySample1();
        var actual = typeOfActivityMapper.toEntity(typeOfActivityMapper.toDto(expected));
        assertTypeOfActivityAllPropertiesEquals(expected, actual);
    }
}
