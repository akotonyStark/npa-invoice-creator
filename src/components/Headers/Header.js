
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap'
import { useSelector } from "react-redux";


const moneyInTxt = (value, standard, dec = 2) => {
  var nf = new Intl.NumberFormat(standard, {
    minimumFractionDigits: dec,
    maximumFractionDigits: 2,
  });
  return nf.format(Number(value) ? value : 0.0);
};

const Header = () => {
  const masterInvoiceList = useSelector((state) => state.masterInvoiceList);
  //console.log("Header List", masterInvoiceList)
  return (
    <>
      <div className='header bg-gradient-info pb-8 pt-5 pt-md-8'>
        <Container fluid>
          <div className='header-body'>
            {/* Card stats */}
            <Row>
              <Col lg='6' xl='4'>
                <Card className='card-stats mb-4 mb-xl-0'>
                  <CardBody>
                    <Row>
                      <div className='col'>
                        <CardTitle
                          tag='h5'
                          className='text-uppercase text-muted mb-0'
                        >
                          Total Invoiced Amount
                        </CardTitle>
                        <span className='h2 font-weight-bold mb-0'>
                          GHS {moneyInTxt(masterInvoiceList.filter((invoice => invoice.status === 'approved')).reduce((total, item) => total + item.total, 0))}
                        </span>
                      </div>
                      <Col className='col-auto'>
                        <div className='icon icon-shape bg-success text-white rounded-circle shadow'>
                          <i className='ni ni-money-coins' />
                        </div>
                      </Col>
                    </Row>
                    <p className='mt-3 mb-0 text-muted text-sm'>
                      <span className='text-success mr-2'>
                        <i className='fa fa-arrow-up' /> 3.48%
                      </span>{' '}
                      <span className='text-nowrap'>Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>

              <Col lg='6' xl='4'>
                <Card className='card-stats mb-4 mb-xl-0'>
                  <CardBody>
                    <Row>
                      <div className='col'>
                        <CardTitle
                          tag='h5'
                          className='text-uppercase text-muted mb-0'
                        >
                          Invoices
                        </CardTitle>
                        <span className='h2 font-weight-bold mb-0'>{masterInvoiceList.length}</span>
                      </div>
                      <Col className='col-auto'>
                        <div className='icon icon-shape bg-yellow text-white rounded-circle shadow'>
                          <i className='fas fa-users' />
                        </div>
                      </Col>
                    </Row>
                    <p className='mt-3 mb-0 text-muted text-sm'>
                      <span className='text-warning mr-2'>
                        <i className='fas fa-arrow-down' /> 1.10%
                      </span>{' '}
                      <span className='text-nowrap'>Since yesterday</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>

              <Col lg='6' xl='4'>
                <Card className='card-stats mb-4 mb-xl-0'>
                  <CardBody>
                    <Row>
                      <div className='col'>
                        <CardTitle
                          tag='h5'
                          className='text-uppercase text-muted mb-0'
                        >
                          Approved
                        </CardTitle>
                        <span className='h2 font-weight-bold mb-0'>{masterInvoiceList.filter(item => item.status === 'approved').length}</span>
                      </div>
                      <Col className='col-auto'>
                        <div className='icon icon-shape bg-info text-white rounded-circle shadow'>
                          <i className='fas fa-percent' />
                        </div>
                      </Col>
                    </Row>
                    <p className='mt-3 mb-0 text-muted text-sm'>
                      <span className='text-success mr-2'>
                        <i className='fas fa-arrow-up' /> 12%
                      </span>{' '}
                      <span className='text-nowrap'>Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Header
