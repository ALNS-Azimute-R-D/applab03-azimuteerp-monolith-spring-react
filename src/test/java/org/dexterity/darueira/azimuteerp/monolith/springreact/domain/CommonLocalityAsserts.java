package org.dexterity.darueira.azimuteerp.monolith.springreact.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class CommonLocalityAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertCommonLocalityAllPropertiesEquals(CommonLocality expected, CommonLocality actual) {
        assertCommonLocalityAutoGeneratedPropertiesEquals(expected, actual);
        assertCommonLocalityAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertCommonLocalityAllUpdatablePropertiesEquals(CommonLocality expected, CommonLocality actual) {
        assertCommonLocalityUpdatableFieldsEquals(expected, actual);
        assertCommonLocalityUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertCommonLocalityAutoGeneratedPropertiesEquals(CommonLocality expected, CommonLocality actual) {
        assertThat(expected)
            .as("Verify CommonLocality auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertCommonLocalityUpdatableFieldsEquals(CommonLocality expected, CommonLocality actual) {
        assertThat(expected)
            .as("Verify CommonLocality relevant properties")
            .satisfies(e -> assertThat(e.getAcronym()).as("check acronym").isEqualTo(actual.getAcronym()))
            .satisfies(e -> assertThat(e.getName()).as("check name").isEqualTo(actual.getName()))
            .satisfies(e -> assertThat(e.getDescription()).as("check description").isEqualTo(actual.getDescription()))
            .satisfies(e -> assertThat(e.getStreetAddress()).as("check streetAddress").isEqualTo(actual.getStreetAddress()))
            .satisfies(e -> assertThat(e.getHouseNumber()).as("check houseNumber").isEqualTo(actual.getHouseNumber()))
            .satisfies(e -> assertThat(e.getLocationName()).as("check locationName").isEqualTo(actual.getLocationName()))
            .satisfies(e -> assertThat(e.getPostalCode()).as("check postalCode").isEqualTo(actual.getPostalCode()))
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
    public static void assertCommonLocalityUpdatableRelationshipsEquals(CommonLocality expected, CommonLocality actual) {
        assertThat(expected)
            .as("Verify CommonLocality relationships")
            .satisfies(e -> assertThat(e.getDistrict()).as("check district").isEqualTo(actual.getDistrict()));
    }
}
