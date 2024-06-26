package org.dexterity.darueira.azimuteerp.monolith.springreact.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.dexterity.darueira.azimuteerp.monolith.springreact.domain.AssertUtils.bigDecimalCompareTo;

public class TicketPurchasedAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTicketPurchasedAllPropertiesEquals(TicketPurchased expected, TicketPurchased actual) {
        assertTicketPurchasedAutoGeneratedPropertiesEquals(expected, actual);
        assertTicketPurchasedAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTicketPurchasedAllUpdatablePropertiesEquals(TicketPurchased expected, TicketPurchased actual) {
        assertTicketPurchasedUpdatableFieldsEquals(expected, actual);
        assertTicketPurchasedUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTicketPurchasedAutoGeneratedPropertiesEquals(TicketPurchased expected, TicketPurchased actual) {
        assertThat(expected)
            .as("Verify TicketPurchased auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTicketPurchasedUpdatableFieldsEquals(TicketPurchased expected, TicketPurchased actual) {
        assertThat(expected)
            .as("Verify TicketPurchased relevant properties")
            .satisfies(e -> assertThat(e.getBuyingCode()).as("check buyingCode").isEqualTo(actual.getBuyingCode()))
            .satisfies(e -> assertThat(e.getDuePaymentDate()).as("check duePaymentDate").isEqualTo(actual.getDuePaymentDate()))
            .satisfies(e -> assertThat(e.getAmountOfTickets()).as("check amountOfTickets").isEqualTo(actual.getAmountOfTickets()))
            .satisfies(
                e -> assertThat(e.getTaxValue()).as("check taxValue").usingComparator(bigDecimalCompareTo).isEqualTo(actual.getTaxValue())
            )
            .satisfies(
                e ->
                    assertThat(e.getTicketValue())
                        .as("check ticketValue")
                        .usingComparator(bigDecimalCompareTo)
                        .isEqualTo(actual.getTicketValue())
            )
            .satisfies(
                e -> assertThat(e.getAcquiredSeatsNumbers()).as("check acquiredSeatsNumbers").isEqualTo(actual.getAcquiredSeatsNumbers())
            )
            .satisfies(e -> assertThat(e.getDescription()).as("check description").isEqualTo(actual.getDescription()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertTicketPurchasedUpdatableRelationshipsEquals(TicketPurchased expected, TicketPurchased actual) {
        assertThat(expected)
            .as("Verify TicketPurchased relationships")
            .satisfies(e -> assertThat(e.getEvent()).as("check event").isEqualTo(actual.getEvent()))
            .satisfies(e -> assertThat(e.getInvoice()).as("check invoice").isEqualTo(actual.getInvoice()));
    }
}
