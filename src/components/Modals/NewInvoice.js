import React from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Modal,
} from 'reactstrap'

function NewInvoice({ setShowNewInvoiceModal }) {
  return (
    <>
      <Modal
        style={{ width: '1200px' }}
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
          <Card className='bg-secondary shadow' style={{ width: '45%' }}>
            <CardBody>
              <Form>
                <h6 className='heading-small text-muted mb-4'>
                  User information
                </h6>
                <div className='pl-lg-4'>
                  <Row>
                    <Col lg='6'>
                      <FormGroup>
                        <label
                          className='form-control-label'
                          htmlFor='input-username'
                        >
                          Username
                        </label>
                        <Input
                          className='form-control-alternative'
                          defaultValue='lucky.jesse'
                          id='input-username'
                          placeholder='Username'
                          type='text'
                        />
                      </FormGroup>
                    </Col>
                    <Col lg='6'>
                      <FormGroup>
                        <label
                          className='form-control-label'
                          htmlFor='input-email'
                        >
                          Email address
                        </label>
                        <Input
                          className='form-control-alternative'
                          id='input-email'
                          placeholder='jesse@example.com'
                          type='email'
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
                          First name
                        </label>
                        <Input
                          className='form-control-alternative'
                          defaultValue='Lucky'
                          id='input-first-name'
                          placeholder='First name'
                          type='text'
                        />
                      </FormGroup>
                    </Col>
                    <Col lg='6'>
                      <FormGroup>
                        <label
                          className='form-control-label'
                          htmlFor='input-last-name'
                        >
                          Last name
                        </label>
                        <Input
                          className='form-control-alternative'
                          defaultValue='Jesse'
                          id='input-last-name'
                          placeholder='Last name'
                          type='text'
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <hr className='my-4' />
                {/* Address */}
                <h6 className='heading-small text-muted mb-4'>
                  Contact information
                </h6>
                <div className='pl-lg-4'>
                  <Row>
                    <Col md='12'>
                      <FormGroup>
                        <label
                          className='form-control-label'
                          htmlFor='input-address'
                        >
                          Address
                        </label>
                        <Input
                          className='form-control-alternative'
                          defaultValue='Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09'
                          id='input-address'
                          placeholder='Home Address'
                          type='text'
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='4'>
                      <FormGroup>
                        <label
                          className='form-control-label'
                          htmlFor='input-city'
                        >
                          City
                        </label>
                        <Input
                          className='form-control-alternative'
                          defaultValue='New York'
                          id='input-city'
                          placeholder='City'
                          type='text'
                        />
                      </FormGroup>
                    </Col>
                    <Col lg='4'>
                      <FormGroup>
                        <label
                          className='form-control-label'
                          htmlFor='input-country'
                        >
                          Country
                        </label>
                        <Input
                          className='form-control-alternative'
                          defaultValue='United States'
                          id='input-country'
                          placeholder='Country'
                          type='text'
                        />
                      </FormGroup>
                    </Col>
                    <Col lg='4'>
                      <FormGroup>
                        <label
                          className='form-control-label'
                          htmlFor='input-country'
                        >
                          Postal code
                        </label>
                        <Input
                          className='form-control-alternative'
                          id='input-postal-code'
                          placeholder='Postal code'
                          type='number'
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <hr className='my-4' />
                {/* Description */}
                <h6 className='heading-small text-muted mb-4'>About me</h6>
                <div className='pl-lg-4'>
                  <FormGroup>
                    <label>About Me</label>
                    <Input
                      className='form-control-alternative'
                      placeholder='A few words about you ...'
                      rows='4'
                      defaultValue='A beautiful Dashboard for Bootstrap 4. It is Free and
                        Open Source.'
                      type='textarea'
                    />
                  </FormGroup>
                </div>
              </Form>
            </CardBody>
            <div className='modal-footer'>
              <Button
                color='primary'
                data-dismiss='modal'
                type='button'
                onClick={() => setShowNewInvoiceModal(false)}
              >
                SAVE DRAFT
              </Button>
              <Button color='success' type='button'>
                SUBMIT
              </Button>
            </div>
          </Card>

          <Card
            className='shadow'
            style={{ width: '55%', marginLeft: '10px' }}
          ></Card>
        </div>
      </Modal>
    </>
  )
}

export default NewInvoice
