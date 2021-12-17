import { useState, createContext } from 'react'
// node.js library that concatenates classes (strings)
import classnames from 'classnames'
// javascipt plugin for creating charts
import Chart from 'chart.js'
// react plugin used to create charts
import { Line, Bar } from 'react-chartjs-2'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  ListGroup,
} from 'reactstrap'

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from 'variables/charts.js'

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

const invoices = [
  {
    invoiceNum: 899007,
    customer: 'LPG',
    type: 'Express',
    serviceCode: '90LPGX',
    total: 1960000,
  },
]

export const AppContext = createContext(null)

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1)
  const [chartExample1Data, setChartExample1Data] = useState('data1')
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false)
  const [invoiceList, setInvoiceList] = useState(invoices)

  if (window.Chart) {
    parseOptions(Chart, chartOptions())
  }

  const toggleNavs = (e, index) => {
    e.preventDefault()
    setActiveNav(index)
    setChartExample1Data('data' + index)
  }
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
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceList.map((invoice, key) => (
                      //console.log('asas')
                      <tr key={key}>
                        <th scope='row'>{invoice.invoiceNum}</th>
                        <td>{invoice.customer}</td>
                        <td>{invoice.type}</td>
                        <td>{invoice.serviceCode}</td>
                        <td>
                          <i className='fas fa-arrow-up text-success mr-3' />
                          {moneyInTxt(invoice.total)}
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
