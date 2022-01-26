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

  const [invoiceList, setInvoiceList, services, supportBranches] =
    useContext(AppContext)

  const descriptionRef = useRef(null)
  const quantityRef = useRef(null)
  const priceRef = useRef(null)

  //handle on chage event for service type
  const handleServiceType = (e) => {
    let selectedSeviceType = services.find(
      (service) => service.name === e.target.value
    )

    setFormData({
      ...formData,
      serviceCode: selectedSeviceType.service_code,
      price: selectedSeviceType.fee,
      invoiceType: e.target.value,
      quantity: 1,
    })

    // setSupportBranches(selectedSeviceType.supported_branches)
  }

  const dispatch = useDispatch()

  useEffect(() => {
    //console.log('Form Data in Form: ', formData)
    //console.log('Grid Data in Form: ', gridData)
    console.log('Invoice List: ', invoiceList)

    return () => {
      //cleanup
    }
  }, [gridData, invoiceList])

  const addRecordToData = (item) => {
    const tot = item.quantity * item.price
    const obj = { ...item, ext: tot }
    //console.log('item:', obj)
    setGridData((gridData) => [...gridData, obj])
    //console.log('GridData:', gridData)
    //reset form
    setFormData({
      customerName: formData.customerName,
      invoiceType: formData.invoiceType,
      businessUnit: formData.businessUnit,
      serviceCode: formData.serviceCode,
      description: formData.invoiceType,
      quantity: '',
      price: '',
      comments: formData.comments,
      // supportedBranch:'',
      // businessUnit:'',
      // invoiceType: '',
      // customerName: '',
    })
  }

  const savePendingInvoice = async () => {
    //console.log('saving ...')

    let invoice = {
      status: 'pending',
      invoiceNum: Math.floor(Math.random(1) * 1000000),
      customer: formData.customerName,
      type: formData.invoiceType,
      serviceCode: formData.serviceCode,
      comments: comments,
      total: gridData.reduce((total, item) => total + item.ext, 0),
      gridInfo: gridData,
    }

    dispatch(saveInvoice(invoice))
    setShowNewInvoiceModal(false)
  }

  const saveDraftInvoice = async () => {
    //console.log('saving ...')

    let invoice = {
      status: 'draft',
      invoiceNum: Math.floor(Math.random(1) * 1000000),
      customer: formData.customerName,
      type: formData.invoiceType,
      serviceCode: formData.serviceCode,
      comments: comments,
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
                  >
                    <option value='' disabled>
                      Select Type
                    </option>
                    {services.map((service, index) => (
                      <option key={index} value={service.name}>
                        {service.name}
                      </option>
                    ))}
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
            <Row>
              <Col md='12'>
                <FormGroup>
                  <label className='form-control-label' htmlFor='input-address'>
                    Supported Branch
                  </label>
                  <select
                    className='form-control'
                    value={formData?.supportedBranch || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        supportedBranch: e.target.value,
                      })
                    }
                  >
                    <option value='' disabled>
                      Select Type
                    </option>
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
              onClick={saveDraftInvoice}
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
