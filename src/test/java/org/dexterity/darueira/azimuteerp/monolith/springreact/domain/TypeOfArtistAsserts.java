package org.dexterity.darueira.azimuteerp.monolith.springreact.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class TypeOfArtistAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTypeOfArtistAllPropertiesEquals(TypeOfArtist expected, TypeOfArtist actual) {
        assertTypeOfArtistAutoGeneratedPropertiesEquals(expected, actual);
        assertTypeOfArtistAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTypeOfArtistAllUpdatablePropertiesEquals(TypeOfArtist expected, TypeOfArtist actual) {
        assertTypeOfArtistUpdatableFieldsEquals(expected, actual);
        assertTypeOfArtistUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTypeOfArtistAutoGeneratedPropertiesEquals(TypeOfArtist expected, TypeOfArtist actual) {
        assertThat(expected)
            .as("Verify TypeOfArtist auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTypeOfArtistUpdatableFieldsEquals(TypeOfArtist expected, TypeOfArtist actual) {
        assertThat(expected)
            .as("Verify TypeOfArtist relevant properties")
            .satisfies(e -> assertThat(e.getAcronym()).as("check acronym").isEqualTo(actual.getAcronym()))
            .satisfies(e -> assertThat(e.getName()).as("check name").isEqualTo(actual.getName()))
            .satisfies(e -> assertThat(e.getDescription()).as("check description").isEqualTo(actual.getDescription()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTypeOfArtistUpdatableRelationshipsEquals(TypeOfArtist expected, TypeOfArtist actual) {}
}
