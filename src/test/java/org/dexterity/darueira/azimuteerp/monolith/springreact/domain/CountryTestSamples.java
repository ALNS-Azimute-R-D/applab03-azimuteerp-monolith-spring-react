package org.dexterity.darueira.azimuteerp.monolith.springreact.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class CountryTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Country getCountrySample1() {
        return new Country().id(1L).acronym("acronym1").name("name1");
    }

    public static Country getCountrySample2() {
        return new Country().id(2L).acronym("acronym2").name("name2");
    }

    public static Country getCountryRandomSampleGenerator() {
        return new Country().id(longCount.incrementAndGet()).acronym(UUID.randomUUID().toString()).name(UUID.randomUUID().toString());
    }
}
