/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUnitPrice = /* GraphQL */ `
  mutation CreateUnitPrice(
    $input: CreateUnitPriceInput!
    $condition: ModelUnitPriceConditionInput
  ) {
    createUnitPrice(input: $input, condition: $condition) {
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
export const updateUnitPrice = /* GraphQL */ `
  mutation UpdateUnitPrice(
    $input: UpdateUnitPriceInput!
    $condition: ModelUnitPriceConditionInput
  ) {
    updateUnitPrice(input: $input, condition: $condition) {
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
export const deleteUnitPrice = /* GraphQL */ `
  mutation DeleteUnitPrice(
    $input: DeleteUnitPriceInput!
    $condition: ModelUnitPriceConditionInput
  ) {
    deleteUnitPrice(input: $input, condition: $condition) {
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
export const createEstimate = /* GraphQL */ `
  mutation CreateEstimate(
    $input: CreateEstimateInput!
    $condition: ModelEstimateConditionInput
  ) {
    createEstimate(input: $input, condition: $condition) {
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
export const updateEstimate = /* GraphQL */ `
  mutation UpdateEstimate(
    $input: UpdateEstimateInput!
    $condition: ModelEstimateConditionInput
  ) {
    updateEstimate(input: $input, condition: $condition) {
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
export const deleteEstimate = /* GraphQL */ `
  mutation DeleteEstimate(
    $input: DeleteEstimateInput!
    $condition: ModelEstimateConditionInput
  ) {
    deleteEstimate(input: $input, condition: $condition) {
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
export const createEstimateItem = /* GraphQL */ `
  mutation CreateEstimateItem(
    $input: CreateEstimateItemInput!
    $condition: ModelEstimateItemConditionInput
  ) {
    createEstimateItem(input: $input, condition: $condition) {
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
export const updateEstimateItem = /* GraphQL */ `
  mutation UpdateEstimateItem(
    $input: UpdateEstimateItemInput!
    $condition: ModelEstimateItemConditionInput
  ) {
    updateEstimateItem(input: $input, condition: $condition) {
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
export const deleteEstimateItem = /* GraphQL */ `
  mutation DeleteEstimateItem(
    $input: DeleteEstimateItemInput!
    $condition: ModelEstimateItemConditionInput
  ) {
    deleteEstimateItem(input: $input, condition: $condition) {
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
export const createInvoice = /* GraphQL */ `
  mutation CreateInvoice(
    $input: CreateInvoiceInput!
    $condition: ModelInvoiceConditionInput
  ) {
    createInvoice(input: $input, condition: $condition) {
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
export const updateInvoice = /* GraphQL */ `
  mutation UpdateInvoice(
    $input: UpdateInvoiceInput!
    $condition: ModelInvoiceConditionInput
  ) {
    updateInvoice(input: $input, condition: $condition) {
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
export const deleteInvoice = /* GraphQL */ `
  mutation DeleteInvoice(
    $input: DeleteInvoiceInput!
    $condition: ModelInvoiceConditionInput
  ) {
    deleteInvoice(input: $input, condition: $condition) {
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
export const createInvoiceItem = /* GraphQL */ `
  mutation CreateInvoiceItem(
    $input: CreateInvoiceItemInput!
    $condition: ModelInvoiceItemConditionInput
  ) {
    createInvoiceItem(input: $input, condition: $condition) {
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
export const updateInvoiceItem = /* GraphQL */ `
  mutation UpdateInvoiceItem(
    $input: UpdateInvoiceItemInput!
    $condition: ModelInvoiceItemConditionInput
  ) {
    updateInvoiceItem(input: $input, condition: $condition) {
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
export const deleteInvoiceItem = /* GraphQL */ `
  mutation DeleteInvoiceItem(
    $input: DeleteInvoiceItemInput!
    $condition: ModelInvoiceItemConditionInput
  ) {
    deleteInvoiceItem(input: $input, condition: $condition) {
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
