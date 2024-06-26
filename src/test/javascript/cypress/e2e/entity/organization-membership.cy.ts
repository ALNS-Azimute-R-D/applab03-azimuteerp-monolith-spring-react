import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('OrganizationMembership e2e test', () => {
  const organizationMembershipPageUrl = '/organization-membership';
  const organizationMembershipPageUrlPattern = new RegExp('/organization-membership(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  // const organizationMembershipSample = {"joinedAt":"2024-06-08","activationStatus":"INVALID"};

  let organizationMembership;
  // let organization;
  // let person;

  beforeEach(() => {
    cy.login(username, password);
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/organizations',
      body: {"acronym":"gadzooks","businessCode":"politely","hierarchicalLevel":"uh-huh","name":"yum","description":"surprisingly onto","businessHandlerClazz":"yum within","mainContactPersonDetailsJSON":"eek","technicalEnvironmentsDetailsJSON":"estimate sampan awe","customAttributesDetailsJSON":"wasteful inasmuch woot","organizationStatus":"READY_TO_START","activationStatus":"ON_HOLD","logoImg":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=","logoImgContentType":"unknown"},
    }).then(({ body }) => {
      organization = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/people',
      body: {"firstname":"though boo excepting","lastname":"woot by","fullname":"but","birthDate":"2024-06-09","gender":"FEMALE","codeBI":"trait near","codeNIF":"intently caption","streetAddress":"greatly","houseNumber":"athlete","locationName":"downshift woot while","postalCode":"or","mainEmail":"aU0@H#.\"NS0n~","landPhoneNumber":"helplessly free","mobilePhoneNumber":"blah since","occupation":"perfectly enlighten meanwhile","preferredLanguage":"woot ","usernameInOAuth2":"frugal authorize","userIdInOAuth2":"yippee","customAttributesDetailsJSON":"modulo","activationStatus":"INVALID","avatarImg":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=","avatarImgContentType":"unknown"},
    }).then(({ body }) => {
      person = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/organization-memberships+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/organization-memberships').as('postEntityRequest');
    cy.intercept('DELETE', '/api/organization-memberships/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/organizations', {
      statusCode: 200,
      body: [organization],
    });

    cy.intercept('GET', '/api/people', {
      statusCode: 200,
      body: [person],
    });

    cy.intercept('GET', '/api/organization-member-roles', {
      statusCode: 200,
      body: [],
    });

  });
   */

  afterEach(() => {
    if (organizationMembership) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/organization-memberships/${organizationMembership.id}`,
      }).then(() => {
        organizationMembership = undefined;
      });
    }
  });

  /* Disabled due to incompatibility
  afterEach(() => {
    if (organization) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/organizations/${organization.id}`,
      }).then(() => {
        organization = undefined;
      });
    }
    if (person) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/people/${person.id}`,
      }).then(() => {
        person = undefined;
      });
    }
  });
   */

  it('OrganizationMemberships menu should load OrganizationMemberships page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('organization-membership');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('OrganizationMembership').should('exist');
    cy.url().should('match', organizationMembershipPageUrlPattern);
  });

  describe('OrganizationMembership page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(organizationMembershipPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create OrganizationMembership page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/organization-membership/new$'));
        cy.getEntityCreateUpdateHeading('OrganizationMembership');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', organizationMembershipPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/organization-memberships',
          body: {
            ...organizationMembershipSample,
            organization: organization,
            person: person,
          },
        }).then(({ body }) => {
          organizationMembership = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/organization-memberships+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/organization-memberships?page=0&size=20>; rel="last",<http://localhost/api/organization-memberships?page=0&size=20>; rel="first"',
              },
              body: [organizationMembership],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(organizationMembershipPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(organizationMembershipPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response?.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details OrganizationMembership page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('organizationMembership');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', organizationMembershipPageUrlPattern);
      });

      it('edit button click should load edit OrganizationMembership page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('OrganizationMembership');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', organizationMembershipPageUrlPattern);
      });

      it('edit button click should load edit OrganizationMembership page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('OrganizationMembership');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', organizationMembershipPageUrlPattern);
      });

      it.skip('last delete button click should delete instance of OrganizationMembership', () => {
        cy.intercept('GET', '/api/organization-memberships/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('organizationMembership').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', organizationMembershipPageUrlPattern);

        organizationMembership = undefined;
      });
    });
  });

  describe('new OrganizationMembership page', () => {
    beforeEach(() => {
      cy.visit(`${organizationMembershipPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('OrganizationMembership');
    });

    it.skip('should create an instance of OrganizationMembership', () => {
      cy.get(`[data-cy="joinedAt"]`).type('2024-06-09');
      cy.get(`[data-cy="joinedAt"]`).blur();
      cy.get(`[data-cy="joinedAt"]`).should('have.value', '2024-06-09');

      cy.get(`[data-cy="activationStatus"]`).select('ON_HOLD');

      cy.get(`[data-cy="organization"]`).select(1);
      cy.get(`[data-cy="person"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        organizationMembership = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', organizationMembershipPageUrlPattern);
    });
  });
});
