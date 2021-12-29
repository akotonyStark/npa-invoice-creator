export const increment = () => {
  return {
    type: "INCREMENT",
    payload: 2,
  };
};

export const decrement = () => {
  return {
    type: "DECREMENT",
    payload: 1,
  };
};

export const saveInvoice = (invoice) => {
  return {
    type: "SAVE_INVOICE",
    payload: invoice,
  };
};

export const loadInvoice = () => {
  return {
    type: "LOAD_INVOICE_LIST",
  };
};

export const updateInvoiceList = (invoice) => {
  return {
    type: "UPDATE_LIST",
    payload: invoice,
  };
};
