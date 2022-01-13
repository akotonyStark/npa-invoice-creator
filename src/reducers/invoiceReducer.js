//REDUCER

const init = [
  {
    invoiceNum: 899007,
    customer: 'LPG',
    type: 'Sanctions',
    serviceCode: '90LPGX',
    total: 1960000,
    status: 'pending',
    comments: '',
    declineReason: '',
    gridInfo: [
      {
        serviceCode: '91231',
        description: 'some descriptions',
        quantity: 10,
        price: 2400,
        total: 24000,
      },
    ],
  },
  {
    invoiceNum: 899009,
    customer: 'White Product',
    type: 'Licensing',
    serviceCode: '90LPGX',
    total: 890000,
    status: 'pending',
    comments: '',
    declineReason: '',
    gridInfo: [
      {
        serviceCode: '91231',
        description: 'some descriptions',
        quantity: 10,
        price: 2400,
        total: 24000,
      },
    ],
  },
]

const invoiceReducer = (state = init, action) => {
  switch (action.type) {
    case 'SAVE_INVOICE':
      console.log('saving new invoice: ', action.payload)
      return [...state, action.payload]
    case 'LOAD_INVOICE_LIST':
      console.log('loading list')
      return state
    case 'UPDATE_LIST':
      console.log('updating list')
      console.log(action.payload)
      return action.payload
    default:
      console.log('defaulting to empty')
      return state
  }
}

export default invoiceReducer
