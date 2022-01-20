import { useState, useEffect, createContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, loadInvoice, saveInvoice } from '../actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'

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
import InvoiceDraft from 'components/Modals/InvoiceDraft'

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
  mode: 'cors',
  cache: 'no-cache',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

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

const renderInvoiceList = () => {}
const reducer = (previousValue, currentValue) => previousValue + currentValue
const totalInvoceAmount = (data) => {
  let total = data.flatMap((value) => value.ext).reduce(reducer)
  console.log({ total })
}

const Index = (props) => {
  //select redux store states
  const masterInvoiceList = useSelector((state) => state.masterInvoiceList)
  //const counter = useSelector((state) => state.counter);

  const [activeNav, setActiveNav] = useState(1)
  const [chartExample1Data, setChartExample1Data] = useState('data1')
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false)
  const [invoiceList, setInvoiceList] = useState(masterInvoiceList)
  const [draftData, setdraftData] = useState(masterInvoiceList)
  const [showDraftDetails, setShowDraftDetails] = useState(false)

  const dispatch = useDispatch()

  //new code - save invoice data to ghana.gov
  const saveToGhana_Gov = async (invoiveId) => {
    try {
      let selectedInvoice = invoiceList.find(
        (invoice) => invoice.invoiceNum === invoiveId
      )
      let invoiceItem = {
        service_code: selectedInvoice.gridInfo[0].serviceCode,
        amount: selectedInvoice.total.toString(),
        currency: 'GHS',
        memo: 'memo',
        account_number: '1001',
      }

      checkout_invoice.invoice_items.push(invoiceItem)

      console.log(checkout_invoice)
      const result = await axios.post(
        `https://iml.npa-enterprise.com/NpaGhGovCheckoutAPI/api/v1/Checkout/Invoice`,
        checkout_invoice
      )

      //await (await fetch(`https://iml.npa-enterprise.com/NpaGhGovCheckoutAPI/api/v1/Checkout/Invoice`,postSettings)).json()
    } catch (error) {
      console.error(error.message)
    }
  }

  const previewSelectedInvoice = (id) => {
    //console.log(id)
    const selectedItem = invoiceList.filter((item) => item.invoiceNum == id)
    console.log('Selected Item', selectedItem)
    setdraftData(selectedItem)
    setShowDraftDetails(true)
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
                              style={{ width: 173 }}
                              id={invoice.invoiceNum}
                              color='success'
                              onClick={(e) =>
                                saveToGhana_Gov(invoice.invoiceNum)
                              }
                              size='md'
                            >
                              View Invoice
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
                              style={{ width: 173 }}
                              id={invoice.invoiceNum}
                              color='secondary'
                              onClick={(e) => console.log(e)}
                              size='md'
                            >
                              View Reason
                            </Button>
                          </td>
                        </tr>
                      ))}
                    {masterInvoiceList
                      .filter((item) => item.status === 'draft')
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
                              className='badge-info'
                            >
                              Draft
                            </Badge>
                          </td>
                          <td>
                            <Button
                              style={{ width: 173 }}
                              id={invoice.invoiceNum}
                              color='info'
                              onClick={(e) =>
                                previewSelectedInvoice(invoice.invoiceNum)
                              }
                              size='md'
                            >
                              View Draft
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
          {showDraftDetails ? (
            <InvoiceDraft
              setShowDraftDetails={setShowDraftDetails}
              draftData={draftData}
              setdraftData={draftData}
            />
          ) : null}
        </Container>
      </div>
    </>
  )
}

export default Index
