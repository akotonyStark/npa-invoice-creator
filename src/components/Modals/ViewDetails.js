import React, { useState, useRef } from 'react'
import { Modal, Button, Row, Col } from 'reactstrap'
import DetailedView from 'components/DetailedView'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { updateInvoiceList } from '../../actions'
import axios from 'axios'
import Loader from './Loader'
import SuccessModal from './SuccessModal'
import FailureModal from './FailureModal'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function ViewDetails({ setShowViewDetails, data }) {
  const masterInvoiceList = useSelector((state) => state.masterInvoiceList)
  const [selectedInvoice, setSelectedInvoice] = useState(data)
  const [showDecline, setShowDecline] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const declineRef = useRef(null)
  const [count, setDeclineClickCount] = useState(0)
  const [loading, setShowLoader] = useState(false)
  const [success, setShowSuccess] = useState(false)
  const [failure, setShowFailure] = useState(false)

  const dispatch = useDispatch()
  let checkout_invoice = {
    mda_branch_code: 'NPA1001',
    firstname: 'Augustine',
    lastname: 'Akoto',
    phonenumber: '05423548448',
    email: 'augustne.larbi-ampofo@persol.net',
    application_id: '1',
    invoice_items: [],
    redirect_url: 'string',
    post_url: 'string',
  }

  const approve = async (selectedInvoice) => {
    // console.log('Selected invoice:', selectedInvoice)
    const item = selectedInvoice[0]
    try {
      let invoiceItem = {
        service_code: item.gridInfo[0].serviceCode,
        amount: item.total.toString(),
        currency: 'GHS',
        memo: 'memo',
        account_number: '1001',
      }

      checkout_invoice.invoice_items.push(invoiceItem)

      console.log(checkout_invoice)

      setShowLoader(true)

      axios
        .post(
          `${process.env.REACT_APP_API_ROOT}/Checkout/Invoice`,
          checkout_invoice
        )
        .then((result) => {
          setShowLoader(false)
          toast.success(
            'Your invoice has successfully been sent to Ghana.Gov. Come back letter to check the status of your invoice'
          )
          item.status = 'approved'
          const newList = [...masterInvoiceList]
          dispatch(updateInvoiceList(newList))
          setShowViewDetails(false)
        })
        .catch((error) => {
          setShowLoader(false)
          //setShowViewDetails(false)
          toast.error(
            'Your invoice could not be sent to Ghana.Gov. Please come back later'
          )
        })

      //await (await fetch(`https://iml.npa-enterprise.com/NpaGhGovCheckoutAPI/api/v1/Checkout/Invoice`,postSettings)).json()
    } catch (error) {
      console.error(error.message)
    }
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
      {loading ? <Loader /> : null}
      <ToastContainer />
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
