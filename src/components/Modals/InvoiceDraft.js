import InvoiceFormDraft from 'components/InvoiceFormDraft'
import InvoicePreviewDraft from 'components/InvoicePreviewDraft'
import React, { useState, createContext } from 'react'
import { Modal } from 'reactstrap'

export const FormContext = createContext(null)

function InvoiceDraft({ setShowDraftDetails, draftData, setdraftData }) {
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
            Draft
          </h1>
          <button
            aria-label='Close'
            className='close'
            data-dismiss='modal'
            type='button'
            onClick={() => setShowDraftDetails(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className='modal-body' style={{ display: 'flex' }}>
          <InvoiceFormDraft
            draftData={draftData}
            setShowDraftDetails={setShowDraftDetails}
          />
          <InvoicePreviewDraft
            draftData={draftData}
            setShowDraftDetails={setShowDraftDetails}
          />
        </div>
      </Modal>
    </>
  )
}

export default InvoiceDraft
