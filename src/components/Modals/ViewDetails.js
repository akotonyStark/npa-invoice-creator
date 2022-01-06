import React from 'react'
import { Modal, Button, Row, Col } from 'reactstrap'
import DetailedView from 'components/DetailedView'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

function ViewDetails({ setShowViewDetails, approve, data }) {
  //console.log('data in view details: ', data)
  return (
    <>
      <Modal
        className='modal-dialog-centered modal-lg'
        isOpen={true}
        toggle={() => console.log('toggled')}
      >
        <div className='modal-header'>
          <h1 className='modal-title' id='exampleModalLabel'>
            View Details
          </h1>
          <button
            aria-label='Close'
            className='close'
            data-dismiss='modal'
            type='button'
            onClick={() => setShowViewDetails(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div
          className='modal-body'
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <DetailedView data={data} />
          <div style={{ marginTop: '10px' }}>
            <Row>
              <Col lg='6'>
                <Button
                  color='danger'
                  data-dismiss='modal'
                  type='button'
                  style={{ width: '100%' }}
                >
                  <FontAwesomeIcon icon={faThumbsDown} />
                  <span className='btn-inner--text'>Decline</span>
                </Button>
              </Col>
              <Col lg='6'>
                <Button
                  color='success'
                  type='button'
                  onClick={approve}
                  style={{ width: '100%' }}
                >
                  <FontAwesomeIcon icon={faThumbsUp} />
                  <span className='btn-inner--text'>Approve</span>
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ViewDetails
