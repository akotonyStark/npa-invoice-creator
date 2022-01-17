import React, { useContext, useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { saveInvoice } from '../actions'
import axios from 'axios'

import {
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Button,
  Card,
  CardBody,
} from 'reactstrap'
import { AppContext } from 'views/Index'
import { FormContext } from './Modals/NewInvoice'

function InvoiceForm() {
  const [
    formData,
    gridData,
    setFormData,
    setGridData,
    setShowNewInvoiceModal,
    init,
    comments,
    setComments,
  ] = useContext(FormContext)

  const [invoiceList, setInvoiceList] = useContext(AppContext)

  const descriptionRef = useRef(null)
  const quantityRef = useRef(null)
  const priceRef = useRef(null)
  const [services, setServices] = useState([])
  const [supportBranches, setSupportBranches] = useState([])

  //get service
  const getServices = async () => {
    try {
      let allService = await (
        await fetch(
          `https://iml.npa-enterprise.com/NpaGhGovCheckoutAPI/api/v1/Checkout/SearchAvailableServices?current_page=0&results_per_page=1000&sort_by=name&sort_ascending=true`
        )
      ).json()

      // const result = await axios.get( `https://iml.npa-enterprise.com/NpaGhGovCheckoutAPI/api/v1/Checkout/SearchAvailableServices?current_page=0&results_per_page=1000&sort_by=name&sort_ascending=true`)
      // console.log({result}); 
      

      console.log({ dd: allService.output })
      setServices(allService.output)
    } catch (error) {
      console.error(error.message)
    }
  }

  const getBranches = async () => {
    try {
      let allService = await (
        await fetch(
          `https://iml.npa-enterprise.com/NpaGhGovCheckoutAPI/api/v1/Checkout/SearchMdaBranches?current_page=0&results_per_page=10000&sort_by=name&sort_ascending=true`
        )
      ).json()

     
    
      setSupportBranches(allService.output)
    } catch (error) {
      console.error(error.message)
    }
  }

  
  //handle on chage event for service type
  const handleServiceType = (e) => {

    let selectedSeviceType = services.find(
      (service) => service.name === e.target.value
    )

    setFormData({
      ...formData,
      serviceCode: selectedSeviceType.service_code,
      price: selectedSeviceType.fee,
      invoiceType:e.target.value,
      quantity: 1,
    })

   // setSupportBranches(selectedSeviceType.supported_branches)
  }

  const dispatch = useDispatch()

  useEffect(() => {
    //console.log('Form Data in Form: ', formData)
    //console.log('Grid Data in Form: ', gridData)
    console.log('Invoice List: ', invoiceList)
    getServices()
    getBranches()
    return () => {
      //cleanup
    }
  }, [gridData, invoiceList])

  const addRecordToData = (item) => {
    const tot = item.quantity * item.price
    const obj = { ...item, ext: tot }
    console.log('item:', obj)
    setGridData((gridData) => [...gridData, obj])
    console.log(gridData)
    //reset form
    setFormData({
       customerName: formData.customerName,
      invoiceType: formData.invoiceType,
      businessUnit: formData.businessUnit,
       serviceCode: formData.serviceCode,
      serviceCode: '',
      description: '',
      quantity: '',
      price: '',
     // supportedBranch:'',
     // businessUnit:'',
     // invoiceType: '',
     // customerName: '',
      
    })

    
    // descriptionRef.current.value = ''
    // quantityRef.current.value = ''
    // priceRef.current.value = ''
  }

  const savePendingInvoice = async () => {
    console.log('saving ...')

    let invoice = {
      status: 'pending',
      invoiceNum: Math.floor(Math.random(1) * 1000000),
      customer: formData.customerName,
      type: formData.invoiceType,
      serviceCode: formData.serviceCode,
      comments: formData.comments,
      total: gridData.reduce((total, item) => total + item.ext, 0),
      gridInfo: gridData,
    }

    dispatch(saveInvoice(invoice))
    setShowNewInvoiceModal(false)
  }

  return (
    <Card
      className='bg-secondary shadow'
      style={{ width: '42%', height: '750px' }}
    >
      <CardBody>
        <Form>
          <h6 className='heading-small text-muted mb-2'>Invoice Details</h6>
          <div className='pl-lg-4'>
            <Row>
              <Col lg='6'>
                <FormGroup>
                  <label className='form-control-label'>Customer Name</label>
                  <Input
                    className='form-control-alternative'
                    id='input-username'
                    placeholder='Customer Name'
                    type='text'
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customerName: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              <Col lg='6'>
                <FormGroup>
                  <label
                    className='form-control-label'
                    htmlFor='input-first-name'
                  >
                    Business Unit
                  </label>
                  <select
                    className='form-control'
                    //defaultValue="Select Unit"
                    value={formData.businessUnit}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        businessUnit: e.target.value,
                      })
                    }
                  >
                    <option value=''>Select Unit</option>
                    <option value='PPR'>PPR</option>
                    <option value='UPPF'>UPPF</option>
                    <option value='Licensing'>Licensing</option>
                    <option value='IM'>IM </option>
                    <option value='Quality Assurance'>Quality Assurance</option>
                  </select>
                </FormGroup>
              </Col>
              
            </Row>
            <Row>
            <Col lg='6'>
                <FormGroup>
                  <label className='form-control-label' htmlFor='input-email'>
                    Service Type
                  </label>
                  <select
                    className='form-control'
                    value={formData.invoiceType}
                    onChange={handleServiceType}
                    // onChange={
                    //   (handleServiceType,
                    //   (e) =>
                    //     setFormData({
                    //       ...formData,
                    //       invoiceType: e.target.value,
                    //     }))
                    // }
                  >
                    <option value=''  disabled>Select Type</option>
                    {services.map((service, index) => (
                      <option key={index} value={service.name}>
                        {service.name}
                      </option>
                    ))}
                    {/* <option value='Sanctions'>Sanctions</option>
                    <option value='Licensing'>Licensing</option>
                    <option value='Processing Fee'>Processing Fee</option>
                    <option value='LPG Distribution &amp; Compensation Margin'>
                      LPG Distribution &amp; Compensation Margin
                    </option>
                    <option value='UPPF Returns/Claims'>
                      UPPF Returns/Claims
                    </option>
                    <option value='Fuel Marking Margin'>
                      Fuel Marking Margin
                    </option>
                    <option value='Price Stabilization &amp; Recovery Levy'>
                      Price Stabilization &amp; Recovery Levy
                    </option>
                    <option value='Kero Promotion Margin'>
                      Kero Promotion Margin
                    </option>
                    <option value='Primary Distribution Margin'>
                      Primary Distribution Margin
                    </option> */}
                  </select>
                </FormGroup>
              </Col>
            
              <Col lg='6'>
                <FormGroup>
                  <label
                    className='form-control-label'
                    htmlFor='input-last-name'
                  >
                    Service Code
                  </label>
                  <Input
                    disabled
                    className='form-control'
                    placeholder='Service Code'
                    value={formData.serviceCode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        serviceCode: e.target.value,
                      })
                    }
                  ></Input>

                  {/* <select
                    className='form-control'
                    value={formData.serviceCode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        serviceCode: e.target.value,
                      })
                    }
                  >
                    <option value=''>Select Unit</option>
                  </select> */}
                </FormGroup>
              </Col>
            </Row>
          </div>
          {/* <hr className='my-4' /> */}
          {/* <h6 className='heading-small text-muted mb-4'>Item information</h6> */}
          <div className='pl-lg-4'>
          
            <Row hidden>
              <Col md='12'>
                <FormGroup>
                  <label className='form-control-label' htmlFor='input-address'>
                    Description
                  </label>
                  <Input
                    className='form-control-alternative'
                    id='input-address'
                    placeholder='Description'
                    type='textarea'
                    rows='2'
                    value={formData.description}
                    ref={descriptionRef}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg='6'>
                <FormGroup>
                  <label className='form-control-label' htmlFor='input-city'>
                    Quantity
                  </label>
                  <Input
                    className='form-control-alternative'
                    id='input-city'
                    placeholder='Quantity'
                   
                    type='text'
                    value={formData.quantity}
                    ref={quantityRef}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        quantity: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              <Col lg='6'>
                <FormGroup>
                  <label className='form-control-label' htmlFor='input-country'>
                    Price(GHS)
                  </label>
                  <Input
                   disabled
                    className='form-control-alternative'
                    id='input-country'
                    placeholder='Price'
                    type='text'
                    value={formData.price}
                    ref={priceRef}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row >
              <Col md='12'>
                <FormGroup>
                  <label className='form-control-label' htmlFor='input-address'>
                  Supported Branch
                  </label>
                  <select
                    className='form-control'
                    value={formData?.supportedBranch||''}
                 
                    onChange={
                      ((e) =>
                        setFormData({
                          ...formData,
                          supportedBranch: e.target.value,
                        }))
                    }
                  >
                    <option value=''  disabled>Select Type</option>
                    {supportBranches.map((branch, index) => (
                      <option key={index} value={branch.branch_code}>
                        {branch.name}
                      </option>
                    ))}
                 
                  </select>
                </FormGroup>
              </Col>
            </Row>
          </div>
          <hr className='my-2' />
          {/* Description */}
          <h6 className='heading-small text-muted mb-4'>Comments</h6>
          <div className='pl-lg-4'>
            <FormGroup>
              <Input
                className='form-control-alternative'
                placeholder='Leave your comments here ...'
                rows='3'
                type='textarea'
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </FormGroup>
          </div>
        </Form>
        <Row>
          <Col lg='6'>
            <button
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                marginBottom: 15,
              }}
              type='button'
              onClick={() => addRecordToData(formData)}
            >
              <span aria-hidden={true}>
                <h4>+ Add Item</h4>
              </span>
            </button>
          </Col>
        </Row>
        <Row>
          <Col lg='6'>
            <Button
              color='primary'
              data-dismiss='modal'
              type='button'
              style={{ width: '100%' }}
            >
              SAVE AS DRAFT
            </Button>
          </Col>
          <Col lg='6'>
            <Button
              color='success'
              type='button'
              onClick={savePendingInvoice}
              style={{ width: '100%' }}
            >
              SUBMIT
            </Button>
          </Col>
        </Row>
      </CardBody>
      <div className='modal-footer'></div>
    </Card>
  )
}

export default InvoiceForm
