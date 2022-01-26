import React from 'react'
import { Modal } from 'reactstrap'

function Loader() {
  return (
    <div>
      <Modal className='modal-dialog-centered modal-sm' isOpen>
        <div
          className='modal-body'
          style={{ backgroundColor: '#001c31', borderRadius: 10 }}
        >
          <div className='py-3 text-center'>
            <img
              style={{ width: 200, height: 150 }}
              src={require('../../assets/img/theme/loader.gif').default}
              alt='loader'
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Loader
