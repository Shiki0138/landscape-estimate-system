/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUnitPrice = /* GraphQL */ `
  subscription OnCreateUnitPrice {
    onCreateUnitPrice {
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
export const onUpdateUnitPrice = /* GraphQL */ `
  subscription OnUpdateUnitPrice {
    onUpdateUnitPrice {
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
export const onDeleteUnitPrice = /* GraphQL */ `
  subscription OnDeleteUnitPrice {
    onDeleteUnitPrice {
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
export const onCreateEstimate = /* GraphQL */ `
  subscription OnCreateEstimate {
    onCreateEstimate {
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
export const onUpdateEstimate = /* GraphQL */ `
  subscription OnUpdateEstimate {
    onUpdateEstimate {
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
export const onDeleteEstimate = /* GraphQL */ `
  subscription OnDeleteEstimate {
    onDeleteEstimate {
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
export const onCreateEstimateItem = /* GraphQL */ `
  subscription OnCreateEstimateItem {
    onCreateEstimateItem {
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
export const onUpdateEstimateItem = /* GraphQL */ `
  subscription OnUpdateEstimateItem {
    onUpdateEstimateItem {
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
export const onDeleteEstimateItem = /* GraphQL */ `
  subscription OnDeleteEstimateItem {
    onDeleteEstimateItem {
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
export const onCreateInvoice = /* GraphQL */ `
  subscription OnCreateInvoice {
    onCreateInvoice {
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
export const onUpdateInvoice = /* GraphQL */ `
  subscription OnUpdateInvoice {
    onUpdateInvoice {
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
export const onDeleteInvoice = /* GraphQL */ `
  subscription OnDeleteInvoice {
    onDeleteInvoice {
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
export const onCreateInvoiceItem = /* GraphQL */ `
  subscription OnCreateInvoiceItem {
    onCreateInvoiceItem {
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
export const onUpdateInvoiceItem = /* GraphQL */ `
  subscription OnUpdateInvoiceItem {
    onUpdateInvoiceItem {
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
export const onDeleteInvoiceItem = /* GraphQL */ `
  subscription OnDeleteInvoiceItem {
    onDeleteInvoiceItem {
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
