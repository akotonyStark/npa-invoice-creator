import { useState, useEffect, createContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, loadInvoice, saveInvoice } from '../actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Badge,
} from 'reactstrap'

import Header from 'components/Headers/Header.js'
import NewInvoice from 'components/Modals/NewInvoice'

const currency = (amount) => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'GHS',
  })
}

const moneyInTxt = (value, standard, dec = 2) => {
  var nf = new Intl.NumberFormat(standard, {
    minimumFractionDigits: dec,
    maximumFractionDigits: 2,
  })
  return nf.format(Number(value) ? value : 0.0)
}

export const AppContext = createContext(null)

const postSettings = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

let checkout_nvoive = {
  mda_branch_code: 'NPA1001',
  firstname: 'Augustine',
  lastname: 'Akoto',
  phonenumber: '05423548448',
  email: 'anugustine.akoto@persol.net',
  application_id: '1',
  invoice_items: [
    {
      service_code: 'string',
      amount: 'string',
      currency: 'GHS',
      memo: 'memo',
      account_number: '1001',
    },
  ],
  redirect_url: 'string',
  post_url: 'string',
}

// {serviceCode: '91231', description: 'some descriptions', quantity: 10, price: 2400, total: 24000}

const Index = (props) => {
  //select redux store states
  const masterInvoiceList = useSelector((state) => state.masterInvoiceList)
  //const counter = useSelector((state) => state.counter);

  const [activeNav, setActiveNav] = useState(1)
  const [chartExample1Data, setChartExample1Data] = useState('data1')
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false)
  const [invoiceList, setInvoiceList] = useState(masterInvoiceList)

  const dispatch = useDispatch()

  //new code - save invoice data to ghana.gov
  const seveToGhana_Gov = async (invoiveId) => {
    let selectedInvoice = invoiceList.find(
      (invoice) => invoice.invoiceNum === invoiveId
    )

    console.log(selectedInvoice.gridInfo)

    //  const invoiceSaved = await (await fetch(``, postSettings)).json()
  }

  useEffect(() => {
    //dispatch(increment());
    dispatch(loadInvoice())
    console.log('InvoiceList State = ', masterInvoiceList)

    return () => {
      //cleanup;
    }
  }, [invoiceList])

  return (
    <>
      <div>
        <Header />
        {/* Page content */}
        <Container className='mt--7' fluid>
          <Row className='mt-5'>
            <Col className='mb-5 mb-xl-0' xl='12'>
              <Card className='shadow'>
                <CardHeader className='border-0'>
                  <Row className='align-items-center'>
                    <div className='col'>
                      <h3 className='mb-0'>Invoices</h3>
                      {/* <h3>{counter}</h3>
                      <Button onClick={() => dispatch(increment())}>
                        Incremment
                      </Button>
                      <Button onClick={() => dispatch(decrement())}>
                        Decerement
                      </Button> */}
                      <br />
                      <h5 className='mb-0'>List of all invoices</h5>
                    </div>
                    <div className='col text-right'>
                      <Button
                        color='primary'
                        href='#pablo'
                        onClick={(e) =>
                          setShowNewInvoiceModal(!showNewInvoiceModal)
                        }
                        size='md'
                      >
                        + New Invoice
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className='align-items-center table-flush' responsive>
                  <thead className='thead-light'>
                    <tr>
                      <th scope='col'>Invoice #</th>
                      <th scope='col'>Customer</th>
                      <th scope='col'>Type</th>
                      <th scope='col'>Service Code</th>
                      <th scope='col'>Total Amount (GHS)</th>
                      <th scope='col'>Status</th>
                      <th scope='col'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {masterInvoiceList
                      .filter((item) => item.status === 'approved')
                      .map((invoice, key) => (
                        <tr key={key}>
                          <th scope='row'>{invoice.invoiceNum}</th>
                          <td>{invoice.customer}</td>
                          <td>{invoice.type}</td>
                          <td>{invoice.serviceCode}</td>
                          <td>
                            <i className='fas fa-arrow-up text-success mr-3' />
                            {moneyInTxt(invoice.total)}
                          </td>
                          <td>
                            <Badge
                              style={{ backgroundColor: 'gold' }}
                              className='badge-default'
                            >
                              Pending Doc Number
                            </Badge>
                          </td>
                          <td>
                            <Button
                              id={invoice.invoiceNum}
                              color='success'
                              onClick={(e) =>
                                seveToGhana_Gov(invoice.invoiceNum)
                              }
                              size='md'
                            >
                              Post to Ghana.Gov
                            </Button>
                          </td>
                        </tr>
                      ))}
                    {masterInvoiceList
                      .filter((item) => item.status === 'declined')
                      .map((invoice, key) => (
                        <tr key={key}>
                          <th scope='row'>{invoice.invoiceNum}</th>
                          <td>{invoice.customer}</td>
                          <td>{invoice.type}</td>
                          <td>{invoice.serviceCode}</td>
                          <td>
                            <i className='fas fa-arrow-up text-success mr-3' />
                            {moneyInTxt(invoice.total)}
                          </td>
                          <td>
                            <Badge
                              style={{ width: 110 }}
                              className='badge-danger'
                            >
                              Declined
                            </Badge>
                          </td>
                          <td>
                            <Button
                              disabled
                              id={invoice.invoiceNum}
                              color='success'
                              onClick={(e) => console.log(e)}
                              size='md'
                            >
                              Post to Ghana.Gov
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>

          {showNewInvoiceModal ? (
            <AppContext.Provider value={[invoiceList, setInvoiceList]}>
              <NewInvoice setShowNewInvoiceModal={setShowNewInvoiceModal} />
            </AppContext.Provider>
          ) : null}
        </Container>
      </div>
    </>
  )
}

export default Index
