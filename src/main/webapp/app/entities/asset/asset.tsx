import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './asset.reducer';

export const Asset = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const assetList = useAppSelector(state => state.asset.entities);
  const loading = useAppSelector(state => state.asset.loading);
  const totalItems = useAppSelector(state => state.asset.totalItems);

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
      <h2 id="asset-heading" data-cy="AssetHeading">
        <Translate contentKey="azimuteErpSpringReactMonolith03App.asset.home.title">Assets</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="azimuteErpSpringReactMonolith03App.asset.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/asset/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="azimuteErpSpringReactMonolith03App.asset.home.createLabel">Create new Asset</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {assetList && assetList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.asset.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('name')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.asset.name">Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('name')} />
                </th>
                <th className="hand" onClick={sort('storageTypeUsed')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.asset.storageTypeUsed">Storage Type Used</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('storageTypeUsed')} />
                </th>
                <th className="hand" onClick={sort('fullFilenamePath')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.asset.fullFilenamePath">Full Filename Path</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('fullFilenamePath')} />
                </th>
                <th className="hand" onClick={sort('status')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.asset.status">Status</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('status')} />
                </th>
                <th className="hand" onClick={sort('preferredPurpose')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.asset.preferredPurpose">Preferred Purpose</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('preferredPurpose')} />
                </th>
                <th className="hand" onClick={sort('assetContentAsBlob')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.asset.assetContentAsBlob">Asset Content As Blob</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('assetContentAsBlob')} />
                </th>
                <th className="hand" onClick={sort('activationStatus')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.asset.activationStatus">Activation Status</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('activationStatus')} />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.asset.assetType">Asset Type</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.asset.rawAssetProcTmp">Raw Asset Proc Tmp</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {assetList.map((asset, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/asset/${asset.id}`} color="link" size="sm">
                      {asset.id}
                    </Button>
                  </td>
                  <td>{asset.name}</td>
                  <td>
                    <Translate contentKey={`azimuteErpSpringReactMonolith03App.StorageTypeEnum.${asset.storageTypeUsed}`} />
                  </td>
                  <td>{asset.fullFilenamePath}</td>
                  <td>
                    <Translate contentKey={`azimuteErpSpringReactMonolith03App.StatusAssetEnum.${asset.status}`} />
                  </td>
                  <td>
                    <Translate contentKey={`azimuteErpSpringReactMonolith03App.PreferredPurposeEnum.${asset.preferredPurpose}`} />
                  </td>
                  <td>
                    {asset.assetContentAsBlob ? (
                      <div>
                        {asset.assetContentAsBlobContentType ? (
                          <a onClick={openFile(asset.assetContentAsBlobContentType, asset.assetContentAsBlob)}>
                            <Translate contentKey="entity.action.open">Open</Translate>
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {asset.assetContentAsBlobContentType}, {byteSize(asset.assetContentAsBlob)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    <Translate contentKey={`azimuteErpSpringReactMonolith03App.ActivationStatusEnum.${asset.activationStatus}`} />
                  </td>
                  <td>{asset.assetType ? <Link to={`/asset-type/${asset.assetType.id}`}>{asset.assetType.name}</Link> : ''}</td>
                  <td>
                    {asset.rawAssetProcTmp ? (
                      <Link to={`/raw-asset-proc-tmp/${asset.rawAssetProcTmp.id}`}>{asset.rawAssetProcTmp.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/asset/${asset.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/asset/${asset.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/asset/${asset.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="azimuteErpSpringReactMonolith03App.asset.home.notFound">No Assets found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={assetList && assetList.length > 0 ? '' : 'd-none'}>
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

export default Asset;
