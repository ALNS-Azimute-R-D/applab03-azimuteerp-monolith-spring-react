package org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper;

import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.ActivityAsserts.*;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.ActivityTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ActivityMapperTest {

    private ActivityMapper activityMapper;

    @BeforeEach
    void setUp() {
        activityMapper = new ActivityMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getActivitySample1();
        var actual = activityMapper.toEntity(activityMapper.toDto(expected));
        assertActivityAllPropertiesEquals(expected, actual);
    }
}
