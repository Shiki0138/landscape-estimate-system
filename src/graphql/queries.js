/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUnitPrice = /* GraphQL */ `
  query GetUnitPrice($id: ID!) {
    getUnitPrice(id: $id) {
      id
      item
      unit
      price
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUnitPrices = /* GraphQL */ `
  query ListUnitPrices(
    $filter: ModelUnitPriceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUnitPrices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        item
        unit
        price
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEstimate = /* GraphQL */ `
  query GetEstimate($id: ID!) {
    getEstimate(id: $id) {
      id
      customerName
      date
      totalAmount
      items {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listEstimates = /* GraphQL */ `
  query ListEstimates(
    $filter: ModelEstimateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEstimates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        customerName
        date
        totalAmount
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEstimateItem = /* GraphQL */ `
  query GetEstimateItem($id: ID!) {
    getEstimateItem(id: $id) {
      id
      estimateID
      unitPriceID
      quantity
      amount
      unitPrice {
        id
        item
        unit
        price
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listEstimateItems = /* GraphQL */ `
  query ListEstimateItems(
    $filter: ModelEstimateItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEstimateItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        estimateID
        unitPriceID
        quantity
        amount
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getInvoice = /* GraphQL */ `
  query GetInvoice($id: ID!) {
    getInvoice(id: $id) {
      id
      customerName
      date
      dueDate
      totalAmount
      items {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listInvoices = /* GraphQL */ `
  query ListInvoices(
    $filter: ModelInvoiceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInvoices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        customerName
        date
        dueDate
        totalAmount
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getInvoiceItem = /* GraphQL */ `
  query GetInvoiceItem($id: ID!) {
    getInvoiceItem(id: $id) {
      id
      invoiceID
      description
      unitPrice
      quantity
      amount
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listInvoiceItems = /* GraphQL */ `
  query ListInvoiceItems(
    $filter: ModelInvoiceItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInvoiceItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        invoiceID
        description
        unitPrice
        quantity
        amount
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
