import { useState, useEffect, createContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Modal,
} from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

import Header from 'components/Headers/Header.js'
import ViewDetails from 'components/Modals/ViewDetails'

const moneyInTxt = (value, standard, dec = 2) => {
  var nf = new Intl.NumberFormat(standard, {
    minimumFractionDigits: dec,
    maximumFractionDigits: 2,
  })
  return nf.format(Number(value) ? value : 0.0)
}

export const AppContext = createContext(null)

const Approval = (props) => {
  const masterInvoiceList = useSelector((state) => state.masterInvoiceList)
  const [showViewDetails, setShowViewDetails] = useState(false)
  const [invoiceList, setInvoiceList] = useState(masterInvoiceList)
  const [data, setData] = useState(masterInvoiceList)

  useEffect(() => {
    console.log('Pending invoices: ', invoiceList)
    return () => {
      //cleanup;
    }
  }, [masterInvoiceList])

  const previewSelectedInvoice = (id) => {
    //console.log(id)
    const selectedItem = invoiceList.filter((item) => item.invoiceNum == id)
    console.log('Selected Item', selectedItem)
    setData(selectedItem)
    setShowViewDetails(true)
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
                      <h3 className='mb-0'>Unapproved Invoices</h3>
                      <br />
                      <h5 className='mb-0'>List of pending invoices</h5>
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
                      <th scope='col'> Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    {masterInvoiceList
                      .filter((item, i) => item.status === 'pending')
                      .map((invoice, key) => (
                        //console.log('asas')
                        <tr key={key} id={invoice.invoiceNum}>
                          <th scope='row'>{invoice.invoiceNum}</th>
                          <td>{invoice.customer}</td>
                          <td>{invoice.type}</td>
                          <td>{invoice.serviceCode}</td>
                          <td>
                            <i className='fas fa-arrow-up text-success mr-3' />
                            {moneyInTxt(invoice.total)}
                          </td>
                          <td>
                            <Button
                              color='info'
                              id={invoice.invoiceNum}
                              onClick={(e) =>
                                previewSelectedInvoice(invoice.invoiceNum)
                              }
                              size='md'
                            >
                              <span className='btn-inner--icon'>
                                <FontAwesomeIcon icon={faEye} />
                              </span>
                              <span className='btn-inner--text'>
                                View Details
                              </span>
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>

          {showViewDetails ? (
            <AppContext.Provider value={[invoiceList, setInvoiceList]}>
              <ViewDetails
                setShowViewDetails={setShowViewDetails}
                data={data}
              />
            </AppContext.Provider>
          ) : null}
        </Container>
      </div>
    </>
  )
}

export default Approval
