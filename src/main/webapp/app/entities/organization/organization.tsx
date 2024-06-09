import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './organization.reducer';

export const Organization = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const organizationList = useAppSelector(state => state.organization.entities);
  const loading = useAppSelector(state => state.organization.loading);
  const totalItems = useAppSelector(state => state.organization.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [pageLocation.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = paginationState.sort;
    const order = paginationState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="organization-heading" data-cy="OrganizationHeading">
        <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.home.title">Organizations</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/organization/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.home.createLabel">Create new Organization</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {organizationList && organizationList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('acronym')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.acronym">Acronym</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('acronym')} />
                </th>
                <th className="hand" onClick={sort('businessCode')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.businessCode">Business Code</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('businessCode')} />
                </th>
                <th className="hand" onClick={sort('hierarchicalLevel')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.hierarchicalLevel">Hierarchical Level</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('hierarchicalLevel')} />
                </th>
                <th className="hand" onClick={sort('name')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.name">Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('name')} />
                </th>
                <th className="hand" onClick={sort('description')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.description">Description</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('description')} />
                </th>
                <th className="hand" onClick={sort('businessHandlerClazz')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.businessHandlerClazz">
                    Business Handler Clazz
                  </Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('businessHandlerClazz')} />
                </th>
                <th className="hand" onClick={sort('mainContactPersonDetailsJSON')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.mainContactPersonDetailsJSON">
                    Main Contact Person Details JSON
                  </Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('mainContactPersonDetailsJSON')} />
                </th>
                <th className="hand" onClick={sort('technicalEnvironmentsDetailsJSON')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.technicalEnvironmentsDetailsJSON">
                    Technical Environments Details JSON
                  </Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('technicalEnvironmentsDetailsJSON')} />
                </th>
                <th className="hand" onClick={sort('customAttributesDetailsJSON')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.customAttributesDetailsJSON">
                    Custom Attributes Details JSON
                  </Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('customAttributesDetailsJSON')} />
                </th>
                <th className="hand" onClick={sort('organizationStatus')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.organizationStatus">Organization Status</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('organizationStatus')} />
                </th>
                <th className="hand" onClick={sort('activationStatus')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.activationStatus">Activation Status</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('activationStatus')} />
                </th>
                <th className="hand" onClick={sort('logoImg')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.logoImg">Logo Img</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('logoImg')} />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.tenant">Tenant</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.typeOfOrganization">
                    Type Of Organization
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.organizationParent">Organization Parent</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {organizationList.map((organization, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/organization/${organization.id}`} color="link" size="sm">
                      {organization.id}
                    </Button>
                  </td>
                  <td>{organization.acronym}</td>
                  <td>{organization.businessCode}</td>
                  <td>{organization.hierarchicalLevel}</td>
                  <td>{organization.name}</td>
                  <td>{organization.description}</td>
                  <td>{organization.businessHandlerClazz}</td>
                  <td>{organization.mainContactPersonDetailsJSON}</td>
                  <td>{organization.technicalEnvironmentsDetailsJSON}</td>
                  <td>{organization.customAttributesDetailsJSON}</td>
                  <td>
                    <Translate
                      contentKey={`azimuteErpSpringReactMonolith03App.OrganizationStatusEnum.${organization.organizationStatus}`}
                    />
                  </td>
                  <td>
                    <Translate contentKey={`azimuteErpSpringReactMonolith03App.ActivationStatusEnum.${organization.activationStatus}`} />
                  </td>
                  <td>
                    {organization.logoImg ? (
                      <div>
                        {organization.logoImgContentType ? (
                          <a onClick={openFile(organization.logoImgContentType, organization.logoImg)}>
                            <img
                              src={`data:${organization.logoImgContentType};base64,${organization.logoImg}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {organization.logoImgContentType}, {byteSize(organization.logoImg)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{organization.tenant ? <Link to={`/tenant/${organization.tenant.id}`}>{organization.tenant.name}</Link> : ''}</td>
                  <td>
                    {organization.typeOfOrganization ? (
                      <Link to={`/type-of-organization/${organization.typeOfOrganization.id}`}>{organization.typeOfOrganization.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {organization.organizationParent ? (
                      <Link to={`/organization/${organization.organizationParent.id}`}>{organization.organizationParent.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/organization/${organization.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/organization/${organization.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() =>
                          (window.location.href = `/organization/${organization.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
                        }
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="azimuteErpSpringReactMonolith03App.organization.home.notFound">No Organizations found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={organizationList && organizationList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Organization;
