package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TypeOfArtistAsserts.*;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TypeOfArtistTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TypeOfArtistMapperTest {

    private TypeOfArtistMapper typeOfArtistMapper;

    @BeforeEach
    void setUp() {
        typeOfArtistMapper = new TypeOfArtistMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getTypeOfArtistSample1();
        var actual = typeOfArtistMapper.toEntity(typeOfArtistMapper.toDto(expected));
        assertTypeOfArtistAllPropertiesEquals(expected, actual);
    }
}
