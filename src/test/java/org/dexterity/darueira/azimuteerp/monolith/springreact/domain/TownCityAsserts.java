package org.dexterity.darueira.azimuteerp.monolith.springreact.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class TownCityAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTownCityAllPropertiesEquals(TownCity expected, TownCity actual) {
        assertTownCityAutoGeneratedPropertiesEquals(expected, actual);
        assertTownCityAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTownCityAllUpdatablePropertiesEquals(TownCity expected, TownCity actual) {
        assertTownCityUpdatableFieldsEquals(expected, actual);
        assertTownCityUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTownCityAutoGeneratedPropertiesEquals(TownCity expected, TownCity actual) {
        assertThat(expected)
            .as("Verify TownCity auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTownCityUpdatableFieldsEquals(TownCity expected, TownCity actual) {
        assertThat(expected)
            .as("Verify TownCity relevant properties")
            .satisfies(e -> assertThat(e.getAcronym()).as("check acronym").isEqualTo(actual.getAcronym()))
            .satisfies(e -> assertThat(e.getName()).as("check name").isEqualTo(actual.getName()))
            .satisfies(e -> assertThat(e.getGeoPolygonArea()).as("check geoPolygonArea").isEqualTo(actual.getGeoPolygonArea()))
            .satisfies(
                e ->
                    assertThat(e.getGeoPolygonAreaContentType())
                        .as("check geoPolygonArea contenty type")
                        .isEqualTo(actual.getGeoPolygonAreaContentType())
            );
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTownCityUpdatableRelationshipsEquals(TownCity expected, TownCity actual) {
        assertThat(expected)
            .as("Verify TownCity relationships")
            .satisfies(e -> assertThat(e.getProvince()).as("check province").isEqualTo(actual.getProvince()));
    }
}
