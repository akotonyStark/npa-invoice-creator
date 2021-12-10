import InvoiceForm from 'components/InvoiceForm'
import InvoicePreview from 'components/InvoicePreview'
import React, { useState, createContext } from 'react'
import { Modal } from 'reactstrap'

const init = {
  customerName: '',
  invoiceType: '',
  businessUnit: '',
  serviceCode: '',
  description: '',
  quantity: 0,
  price: 0,
  comments: '',
}

export const FormContext = createContext(null)

function NewInvoice({ setShowNewInvoiceModal }) {
  const [formData, setFormData] = useState(init)
  const [gridData, setGridData] = useState([])

  return (
    <>
      <Modal
        style={{ width: '1200px' }}
        className='modal-dialog-centered modal-xl'
        isOpen={true}
        toggle={() => console.log('toggled')}
      >
        <div className='modal-header'>
          <h1 className='modal-title' id='exampleModalLabel'>
            Create your invoice
          </h1>
          <button
            aria-label='Close'
            className='close'
            data-dismiss='modal'
            type='button'
            onClick={() => setShowNewInvoiceModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className='modal-body' style={{ display: 'flex' }}>
          <FormContext.Provider
            value={[
              formData,
              gridData,
              setFormData,
              setGridData,
              setShowNewInvoiceModal,
              init,
            ]}
          >
            <InvoiceForm />
            <InvoicePreview />
          </FormContext.Provider>
        </div>
      </Modal>
    </>
  )
}

export default NewInvoice
