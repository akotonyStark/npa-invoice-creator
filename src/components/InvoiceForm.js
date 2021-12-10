import React, { useContext, useState, useEffect } from 'react'
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
import { FormContext } from './Modals/NewInvoice'

function InvoiceForm() {
  const [
    formData,
    gridData,
    setFormData,
    setGridData,
    setShowNewInvoiceModal,
    init,
  ] = useContext(FormContext)

  useEffect(() => {
    console.log('Form Data in Form: ', formData)
    console.log('Grid Data in Form: ', gridData)
    return () => {
      //cleanup
    }
  }, [gridData])

  const addRecordToData = (item) => {
    setGridData((gridData) => [...gridData, item])
  }

  return (
    <Card className='bg-secondary shadow' style={{ width: '45%' }}>
      <CardBody>
        <Form>
          <h6 className='heading-small text-muted mb-4'>
            Customer information
          </h6>
          <div className='pl-lg-4'>
            <Row>
              <Col lg='6'>
                <FormGroup>
                  <label
                    className='form-control-label'
                    htmlFor='input-username'
                  >
                    Customer Name
                  </label>
                  <Input
                    className='form-control-alternative'
                    id='input-username'
                    placeholder='Customer Name'
                    type='text'
                    defaultValue={formData.customerName}
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
                  <label className='form-control-label' htmlFor='input-email'>
                    Invoice Type
                  </label>
                  <Input
                    className='form-control-alternative'
                    id='input-email'
                    placeholder='Invoice type'
                    type='text'
                    defaultValue={formData.invoiceType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        invoiceType: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg='6'>
                <FormGroup>
                  <label
                    className='form-control-label'
                    htmlFor='input-first-name'
                  >
                    Business Unit
                  </label>
                  <Input
                    className='form-control-alternative'
                    id='input-first-name'
                    placeholder='Business unit'
                    type='text'
                    defaultValue={formData.businessUnit}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        businessUnit: e.target.value,
                      })
                    }
                  />
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
                    className='form-control-alternative'
                    defaultValue='code'
                    id='input-last-name'
                    placeholder='Service code'
                    type='text'
                    defaultValue={formData.serviceCode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        serviceCode: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
          </div>
          <hr className='my-4' />
          {/* Address */}
          <h6 className='heading-small text-muted mb-4'>Item information</h6>
          <div className='pl-lg-4'>
            <Row>
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
                    defaultValue={formData.description}
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
                    defaultValue={formData.quantity}
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
                    className='form-control-alternative'
                    id='input-country'
                    placeholder='Price'
                    type='text'
                    defaultValue={formData.price}
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
          </div>
          <hr className='my-4' />
          {/* Description */}
          <h6 className='heading-small text-muted mb-4'>Comments</h6>
          <div className='pl-lg-4'>
            <FormGroup>
              <Input
                className='form-control-alternative'
                placeholder='Leave your comments here ...'
                rows='4'
                type='textarea'
                defaultValue={formData.comments}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    comments: e.target.value,
                  })
                }
              />
            </FormGroup>
          </div>
        </Form>
        <Row>
          <Col lg='6'>
            <button
              style={{ backgroundColor: 'transparent', border: 'none' }}
              type='button'
              onClick={() => addRecordToData(formData)}
            >
              <span aria-hidden={true}>
                <h4>+ Add Item</h4>
              </span>
            </button>
          </Col>
        </Row>
      </CardBody>
      <div className='modal-footer'>
        <Button color='primary' data-dismiss='modal' type='button'>
          SAVE DRAFT
        </Button>
        <Button color='success' type='button'>
          SUBMIT
        </Button>
      </div>
    </Card>
  )
}

export default InvoiceForm
