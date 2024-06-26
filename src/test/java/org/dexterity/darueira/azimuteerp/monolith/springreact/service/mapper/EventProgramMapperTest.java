package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.EventProgramAsserts.*;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.EventProgramTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class EventProgramMapperTest {

    private EventProgramMapper eventProgramMapper;

    @BeforeEach
    void setUp() {
        eventProgramMapper = new EventProgramMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getEventProgramSample1();
        var actual = eventProgramMapper.toEntity(eventProgramMapper.toDto(expected));
        assertEventProgramAllPropertiesEquals(expected, actual);
    }
}
