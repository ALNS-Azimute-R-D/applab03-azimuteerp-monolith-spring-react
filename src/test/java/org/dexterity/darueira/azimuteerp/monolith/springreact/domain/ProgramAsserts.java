package org.dexterity.darueira.azimuteerp.monolith.springreact.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class ProgramAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertProgramAllPropertiesEquals(Program expected, Program actual) {
        assertProgramAutoGeneratedPropertiesEquals(expected, actual);
        assertProgramAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertProgramAllUpdatablePropertiesEquals(Program expected, Program actual) {
        assertProgramUpdatableFieldsEquals(expected, actual);
        assertProgramUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertProgramAutoGeneratedPropertiesEquals(Program expected, Program actual) {
        assertThat(expected)
            .as("Verify Program auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertProgramUpdatableFieldsEquals(Program expected, Program actual) {
        assertThat(expected)
            .as("Verify Program relevant properties")
            .satisfies(e -> assertThat(e.getAcronym()).as("check acronym").isEqualTo(actual.getAcronym()))
            .satisfies(e -> assertThat(e.getName()).as("check name").isEqualTo(actual.getName()))
            .satisfies(e -> assertThat(e.getDescription()).as("check description").isEqualTo(actual.getDescription()))
            .satisfies(e -> assertThat(e.getFullDescription()).as("check fullDescription").isEqualTo(actual.getFullDescription()))
            .satisfies(e -> assertThat(e.getTargetPublic()).as("check targetPublic").isEqualTo(actual.getTargetPublic()))
            .satisfies(e -> assertThat(e.getActivationStatus()).as("check activationStatus").isEqualTo(actual.getActivationStatus()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertProgramUpdatableRelationshipsEquals(Program expected, Program actual) {}
}
