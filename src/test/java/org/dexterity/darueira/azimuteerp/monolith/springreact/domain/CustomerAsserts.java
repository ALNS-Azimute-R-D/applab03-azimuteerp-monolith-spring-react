package org.dexterity.darueira.azimuteerp.monolith.springreact.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class CustomerAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertCustomerAllPropertiesEquals(Customer expected, Customer actual) {
        assertCustomerAutoGeneratedPropertiesEquals(expected, actual);
        assertCustomerAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertCustomerAllUpdatablePropertiesEquals(Customer expected, Customer actual) {
        assertCustomerUpdatableFieldsEquals(expected, actual);
        assertCustomerUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertCustomerAutoGeneratedPropertiesEquals(Customer expected, Customer actual) {
        assertThat(expected)
            .as("Verify Customer auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertCustomerUpdatableFieldsEquals(Customer expected, Customer actual) {
        assertThat(expected)
            .as("Verify Customer relevant properties")
            .satisfies(
                e -> assertThat(e.getCustomerBusinessCode()).as("check customerBusinessCode").isEqualTo(actual.getCustomerBusinessCode())
            )
            .satisfies(e -> assertThat(e.getFullname()).as("check fullname").isEqualTo(actual.getFullname()))
            .satisfies(
                e ->
                    assertThat(e.getCustomAttributesDetailsJSON())
                        .as("check customAttributesDetailsJSON")
                        .isEqualTo(actual.getCustomAttributesDetailsJSON())
            )
            .satisfies(e -> assertThat(e.getCustomerStatus()).as("check customerStatus").isEqualTo(actual.getCustomerStatus()))
            .satisfies(e -> assertThat(e.getActivationStatus()).as("check activationStatus").isEqualTo(actual.getActivationStatus()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertCustomerUpdatableRelationshipsEquals(Customer expected, Customer actual) {
        assertThat(expected)
            .as("Verify Customer relationships")
            .satisfies(e -> assertThat(e.getBuyerPerson()).as("check buyerPerson").isEqualTo(actual.getBuyerPerson()))
            .satisfies(e -> assertThat(e.getCustomerType()).as("check customerType").isEqualTo(actual.getCustomerType()))
            .satisfies(e -> assertThat(e.getDistrict()).as("check district").isEqualTo(actual.getDistrict()));
    }
}
