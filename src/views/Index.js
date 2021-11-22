/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useState } from 'react'
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

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1)
  const [chartExample1Data, setChartExample1Data] = useState('data1')
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false)

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
                      <th scope='col'>Page name</th>
                      <th scope='col'>Visitors</th>
                      <th scope='col'>Unique users</th>
                      <th scope='col'>Bounce rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope='row'>/argon/</th>
                      <td>4,569</td>
                      <td>340</td>
                      <td>
                        <i className='fas fa-arrow-up text-success mr-3' />{' '}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope='row'>/argon/index.html</th>
                      <td>3,985</td>
                      <td>319</td>
                      <td>
                        <i className='fas fa-arrow-down text-warning mr-3' />{' '}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope='row'>/argon/charts.html</th>
                      <td>3,513</td>
                      <td>294</td>
                      <td>
                        <i className='fas fa-arrow-down text-warning mr-3' />{' '}
                        36,49%
                      </td>
                    </tr>
                    <tr>
                      <th scope='row'>/argon/tables.html</th>
                      <td>2,050</td>
                      <td>147</td>
                      <td>
                        <i className='fas fa-arrow-up text-success mr-3' />{' '}
                        50,87%
                      </td>
                    </tr>
                    <tr>
                      <th scope='row'>/argon/profile.html</th>
                      <td>1,795</td>
                      <td>190</td>
                      <td>
                        <i className='fas fa-arrow-down text-danger mr-3' />{' '}
                        46,53%
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>

          {showNewInvoiceModal ? (
            <NewInvoice setShowNewInvoiceModal={setShowNewInvoiceModal} />
          ) : null}
        </Container>
      </div>
    </>
  )
}

export default Index
