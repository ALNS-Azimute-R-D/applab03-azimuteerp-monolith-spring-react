import country from 'app/entities/country/country.reducer';
import province from 'app/entities/province/province.reducer';
import townCity from 'app/entities/town-city/town-city.reducer';
import district from 'app/entities/district/district.reducer';
import commonLocality from 'app/entities/common-locality/common-locality.reducer';
import tenant from 'app/entities/tenant/tenant.reducer';
import typeOfOrganization from 'app/entities/type-of-organization/type-of-organization.reducer';
import organization from 'app/entities/organization/organization.reducer';
import businessUnit from 'app/entities/business-unit/business-unit.reducer';
import organizationDomain from 'app/entities/organization-domain/organization-domain.reducer';
import organizationAttribute from 'app/entities/organization-attribute/organization-attribute.reducer';
import typeOfPerson from 'app/entities/type-of-person/type-of-person.reducer';
import person from 'app/entities/person/person.reducer';
import organizationRole from 'app/entities/organization-role/organization-role.reducer';
import organizationMembership from 'app/entities/organization-membership/organization-membership.reducer';
import organizationMemberRole from 'app/entities/organization-member-role/organization-member-role.reducer';
import assetType from 'app/entities/asset-type/asset-type.reducer';
import rawAssetProcTmp from 'app/entities/raw-asset-proc-tmp/raw-asset-proc-tmp.reducer';
import asset from 'app/entities/asset/asset.reducer';
import assetMetadata from 'app/entities/asset-metadata/asset-metadata.reducer';
import assetCollection from 'app/entities/asset-collection/asset-collection.reducer';
import invoice from 'app/entities/invoice/invoice.reducer';
import paymentGateway from 'app/entities/payment-gateway/payment-gateway.reducer';
import payment from 'app/entities/payment/payment.reducer';
import warehouse from 'app/entities/warehouse/warehouse.reducer';
import supplier from 'app/entities/supplier/supplier.reducer';
import brand from 'app/entities/brand/brand.reducer';
import product from 'app/entities/product/product.reducer';
import inventoryTransaction from 'app/entities/inventory-transaction/inventory-transaction.reducer';
import stockLevel from 'app/entities/stock-level/stock-level.reducer';
import customer from 'app/entities/customer/customer.reducer';
import customerType from 'app/entities/customer-type/customer-type.reducer';
import category from 'app/entities/category/category.reducer';
import article from 'app/entities/article/article.reducer';
import order from 'app/entities/order/order.reducer';
import orderItem from 'app/entities/order-item/order-item.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  country,
  province,
  townCity,
  district,
  commonLocality,
  tenant,
  typeOfOrganization,
  organization,
  businessUnit,
  organizationDomain,
  organizationAttribute,
  typeOfPerson,
  person,
  organizationRole,
  organizationMembership,
  organizationMemberRole,
  assetType,
  rawAssetProcTmp,
  asset,
  assetMetadata,
  assetCollection,
  invoice,
  paymentGateway,
  payment,
  warehouse,
  supplier,
  brand,
  product,
  inventoryTransaction,
  stockLevel,
  customer,
  customerType,
  category,
  article,
  order,
  orderItem,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
