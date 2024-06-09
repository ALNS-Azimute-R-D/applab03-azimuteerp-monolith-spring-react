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

import { getEntities } from './payment.reducer';

export const Payment = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const paymentList = useAppSelector(state => state.payment.entities);
  const loading = useAppSelector(state => state.payment.loading);
  const totalItems = useAppSelector(state => state.payment.totalItems);

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
      <h2 id="payment-heading" data-cy="PaymentHeading">
        <Translate contentKey="azimuteErpSpringReactMonolith03App.payment.home.title">Payments</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="azimuteErpSpringReactMonolith03App.payment.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/payment/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="azimuteErpSpringReactMonolith03App.payment.home.createLabel">Create new Payment</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {paymentList && paymentList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.payment.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('installmentNumber')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.payment.installmentNumber">Installment Number</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('installmentNumber')} />
                </th>
                <th className="hand" onClick={sort('paymentDueDate')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.payment.paymentDueDate">Payment Due Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('paymentDueDate')} />
                </th>
                <th className="hand" onClick={sort('paymentPaidDate')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.payment.paymentPaidDate">Payment Paid Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('paymentPaidDate')} />
                </th>
                <th className="hand" onClick={sort('paymentAmount')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.payment.paymentAmount">Payment Amount</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('paymentAmount')} />
                </th>
                <th className="hand" onClick={sort('typeOfPayment')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.payment.typeOfPayment">Type Of Payment</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('typeOfPayment')} />
                </th>
                <th className="hand" onClick={sort('statusPayment')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.payment.statusPayment">Status Payment</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('statusPayment')} />
                </th>
                <th className="hand" onClick={sort('customAttributesDetailsJSON')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.payment.customAttributesDetailsJSON">
                    Custom Attributes Details JSON
                  </Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('customAttributesDetailsJSON')} />
                </th>
                <th className="hand" onClick={sort('activationStatus')}>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.payment.activationStatus">Activation Status</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('activationStatus')} />
                </th>
                <th>
                  <Translate contentKey="azimuteErpSpringReactMonolith03App.payment.paymentGateway">Payment Gateway</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {paymentList.map((payment, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/payment/${payment.id}`} color="link" size="sm">
                      {payment.id}
                    </Button>
                  </td>
                  <td>{payment.installmentNumber}</td>
                  <td>
                    {payment.paymentDueDate ? <TextFormat type="date" value={payment.paymentDueDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {payment.paymentPaidDate ? <TextFormat type="date" value={payment.paymentPaidDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{payment.paymentAmount}</td>
                  <td>
                    <Translate contentKey={`azimuteErpSpringReactMonolith03App.PaymentTypeEnum.${payment.typeOfPayment}`} />
                  </td>
                  <td>
                    <Translate contentKey={`azimuteErpSpringReactMonolith03App.PaymentStatusEnum.${payment.statusPayment}`} />
                  </td>
                  <td>{payment.customAttributesDetailsJSON}</td>
                  <td>
                    <Translate contentKey={`azimuteErpSpringReactMonolith03App.ActivationStatusEnum.${payment.activationStatus}`} />
                  </td>
                  <td>
                    {payment.paymentGateway ? (
                      <Link to={`/payment-gateway/${payment.paymentGateway.id}`}>{payment.paymentGateway.aliasCode}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/payment/${payment.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/payment/${payment.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/payment/${payment.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="azimuteErpSpringReactMonolith03App.payment.home.notFound">No Payments found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={paymentList && paymentList.length > 0 ? '' : 'd-none'}>
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

export default Payment;
