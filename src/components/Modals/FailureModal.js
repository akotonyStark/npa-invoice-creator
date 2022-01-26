import React from 'react'
import { Modal, Button } from 'reactstrap'

function FailureModal(props) {
  return (
    <Modal
      className='modal-dialog-centered modal-danger'
      contentClassName='bg-gradient-danger'
      isOpen={true}
    >
      <div className='modal-header'>
        <h6 className='modal-title' id='modal-title-notification'>
          Your attention is required
        </h6>
        <button
          aria-label='Close'
          className='close'
          data-dismiss='modal'
          type='button'
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className='modal-body'>
        <div className='py-3 text-center'>
          <i className='ni ni-bell-55 ni-3x' />
          <h4 className='heading mt-4'>Error</h4>
          <p>{props.message}</p>
        </div>
      </div>
      <div className='modal-footer'>
        <Button className='btn-white' color='default' type='button'>
          Ok, Got it
        </Button>
        <Button
          className='text-white ml-auto'
          color='link'
          data-dismiss='modal'
          type='button'
        >
          Close
        </Button>
      </div>
    </Modal>
  )
}

export default FailureModal
