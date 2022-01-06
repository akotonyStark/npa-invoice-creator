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
  quantity: '',
  price: '',
}

export const FormContext = createContext(null)

function NewInvoice({ setShowNewInvoiceModal }) {
  const [formData, setFormData] = useState(init)
  const [gridData, setGridData] = useState([])
  const [comments, setComments] = useState('')

  return (
    <>
      <Modal
        style={{ width: '150%', height: '600px' }}
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
              comments,
              setComments,
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
