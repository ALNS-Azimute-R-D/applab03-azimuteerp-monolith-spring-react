import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './common-locality.reducer';

export const CommonLocality = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const commonLocalityList = useAppSelector(state => state.commonLocality.entities);
  const loading = useAppSelector(state => state.commonLocality.loading);
  const totalItems = useAppSelector(state => state.commonLocality.totalItems);

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
      <h2 id="common-locality-heading" data-cy="CommonLocalityHeading">
        <Translate contentKey="azimuteErpSpringReactMonolith03App.commonLocality.home.title">Common Localities</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="azimuteErpSpringReactMonolith03App.commonLocality.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/common-locality/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="azimuteErpSpringReactMonolith03App.commonLocality.home.createLabel">
              Create new Common Locality
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {commonLocalityList && commonLocalityList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.commonLocality.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('acronym')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.commonLocality.acronym">Acronym</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('acronym')} />
                </th>
                <th className="hand" onClick={sort('name')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.commonLocality.name">Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('name')} />
                </th>
                <th className="hand" onClick={sort('description')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.commonLocality.description">Description</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('description')} />
                </th>
                <th className="hand" onClick={sort('streetAddress')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.commonLocality.streetAddress">Street Address</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('streetAddress')} />
                </th>
                <th className="hand" onClick={sort('houseNumber')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.commonLocality.houseNumber">House Number</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('houseNumber')} />
                </th>
                <th className="hand" onClick={sort('locationName')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.commonLocality.locationName">Location Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('locationName')} />
                </th>
                <th className="hand" onClick={sort('postalCode')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.commonLocality.postalCode">Postal Code</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('postalCode')} />
                </th>
                <th className="hand" onClick={sort('geoPolygonArea')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.commonLocality.geoPolygonArea">Geo Polygon Area</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('geoPolygonArea')} />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.commonLocality.district">District</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {commonLocalityList.map((commonLocality, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/common-locality/${commonLocality.id}`} color="link" size="sm">
                      {commonLocality.id}
                    </Button>
                  </td>
                  <td>{commonLocality.acronym}</td>
                  <td>{commonLocality.name}</td>
                  <td>{commonLocality.description}</td>
                  <td>{commonLocality.streetAddress}</td>
                  <td>{commonLocality.houseNumber}</td>
                  <td>{commonLocality.locationName}</td>
                  <td>{commonLocality.postalCode}</td>
                  <td>
                    {commonLocality.geoPolygonArea ? (
                      <div>
                        {commonLocality.geoPolygonAreaContentType ? (
                          <a onClick={openFile(commonLocality.geoPolygonAreaContentType, commonLocality.geoPolygonArea)}>
                            <Translate contentKey="entity.action.open">Open</Translate>
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {commonLocality.geoPolygonAreaContentType}, {byteSize(commonLocality.geoPolygonArea)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {commonLocality.district ? (
                      <Link to={`/district/${commonLocality.district.id}`}>{commonLocality.district.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/common-locality/${commonLocality.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/common-locality/${commonLocality.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/common-locality/${commonLocality.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="azimuteErpSpringReactMonolith03App.commonLocality.home.notFound">No Common Localities found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={commonLocalityList && commonLocalityList.length > 0 ? '' : 'd-none'}>
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

export default CommonLocality;
