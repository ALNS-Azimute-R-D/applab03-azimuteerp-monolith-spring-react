import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './stock-level.reducer';

export const StockLevel = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const stockLevelList = useAppSelector(state => state.stockLevel.entities);
  const loading = useAppSelector(state => state.stockLevel.loading);
  const totalItems = useAppSelector(state => state.stockLevel.totalItems);

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
      <h2 id="stock-level-heading" data-cy="StockLevelHeading">
        <Translate contentKey="azimuteErpSpringReactMonolith03App.stockLevel.home.title">Stock Levels</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="azimuteErpSpringReactMonolith03App.stockLevel.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/stock-level/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="azimuteErpSpringReactMonolith03App.stockLevel.home.createLabel">Create new Stock Level</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {stockLevelList && stockLevelList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.stockLevel.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('lastModifiedDate')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.stockLevel.lastModifiedDate">Last Modified Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('lastModifiedDate')} />
                </th>
                <th className="hand" onClick={sort('remainingQuantity')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.stockLevel.remainingQuantity">Remaining Quantity</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('remainingQuantity')} />
                </th>
                <th className="hand" onClick={sort('commonAttributesDetailsJSON')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.stockLevel.commonAttributesDetailsJSON">
                    Common Attributes Details JSON
                  </Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('commonAttributesDetailsJSON')} />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.stockLevel.warehouse">Warehouse</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.stockLevel.product">Product</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {stockLevelList.map((stockLevel, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/stock-level/${stockLevel.id}`} color="link" size="sm">
                      {stockLevel.id}
                    </Button>
                  </td>
                  <td>
                    {stockLevel.lastModifiedDate ? (
                      <TextFormat type="date" value={stockLevel.lastModifiedDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{stockLevel.remainingQuantity}</td>
                  <td>{stockLevel.commonAttributesDetailsJSON}</td>
                  <td>
                    {stockLevel.warehouse ? <Link to={`/warehouse/${stockLevel.warehouse.id}`}>{stockLevel.warehouse.acronym}</Link> : ''}
                  </td>
                  <td>
                    {stockLevel.product ? <Link to={`/product/${stockLevel.product.id}`}>{stockLevel.product.productName}</Link> : ''}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/stock-level/${stockLevel.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/stock-level/${stockLevel.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/stock-level/${stockLevel.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="azimuteErpSpringReactMonolith03App.stockLevel.home.notFound">No Stock Levels found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={stockLevelList && stockLevelList.length > 0 ? '' : 'd-none'}>
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

export default StockLevel;