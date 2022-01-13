import React, { useState, useRef } from 'react'
import { Modal, Button, Row, Col } from 'reactstrap'
import DetailedView from 'components/DetailedView'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { updateInvoiceList } from '../../actions'

function ViewDetails({ setShowViewDetails, data }) {
  const masterInvoiceList = useSelector((state) => state.masterInvoiceList)
  const [selectedInvoice, setSelectedInvoice] = useState(data)
  const [showDecline, setShowDecline] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const declineRef = useRef(null)
  const [count, setDeclineClickCount] = useState(0)

  const dispatch = useDispatch()
  const approve = (selectedInvoice) => {
    console.log('Selected invoice:', selectedInvoice)

    const item = selectedInvoice[0]
    item.status = 'approved'
    const newList = [...masterInvoiceList]
    //console.log(newList)
    dispatch(updateInvoiceList(newList))
    setShowViewDetails(false)
  }

  const declineInvoice = (selectedInvoice) => {
    const item = selectedInvoice[0]
    item.status = 'declined'
    const newList = [...masterInvoiceList]
    console.log(newList)
    dispatch(updateInvoiceList(newList))
    setShowViewDetails(false)
  }

  const handleDecline = () => {
    setDeclineClickCount(count + 1)
    if (count == 0) {
      setShowDecline(!showDecline)
      setDisabled(!disabled)
    } else {
      declineInvoice(selectedInvoice)
    }
  }
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
          <DetailedView
            data={data}
            selectedInvoice={selectedInvoice}
            setSelectedInvoice={setSelectedInvoice}
            showDecline={showDecline}
            setDisabled={setDisabled}
          />
          <div style={{ marginTop: '10px' }}>
            <Row>
              <Col lg='6'>
                <Button
                  disabled={disabled}
                  id={data.invoiceNum}
                  color='danger'
                  data-dismiss='modal'
                  type='button'
                  style={{ width: '100%' }}
                  onClick={handleDecline}
                  ref={declineRef}
                >
                  <FontAwesomeIcon icon={faThumbsDown} />
                  <span className='btn-inner--text'>Decline</span>
                </Button>
              </Col>
              <Col lg='6'>
                <Button
                  id={data.invoiceNum}
                  color='success'
                  type='button'
                  onClick={(e) => approve(selectedInvoice)}
                  style={{ width: '100%' }}
                >
                  <FontAwesomeIcon id={data.invoiceNum} icon={faThumbsUp} />
                  <span id={data.invoiceNum} className='btn-inner--text'>
                    Approve
                  </span>
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
