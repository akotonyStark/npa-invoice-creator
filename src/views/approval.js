import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {updateInvoiceList} from "../actions";
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import NewInvoice from "components/Modals/NewInvoice";

const currency = (amount) => {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "GHS",
  });
};

const moneyInTxt = (value, standard, dec = 2) => {
  var nf = new Intl.NumberFormat(standard, {
    minimumFractionDigits: dec,
    maximumFractionDigits: 2,
  });
  return nf.format(Number(value) ? value : 0.0);
};

const Approval = (props) => {
  const masterInvoiceList = useSelector((state) => state.masterInvoiceList);
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  const [invoiceList, setInvoiceList] = useState(masterInvoiceList);

  useEffect(() => {
    console.log("Pending invoices: ", invoiceList);
    return () => {
      //cleanup;
    };
  }, [masterInvoiceList]);



  const dispatch = useDispatch();

  const approve = (e) => {
    const selectedItem = invoiceList.filter((item) => item.invoiceNum == e.target.id)
    const item = selectedItem[0]    
    item.status = "approved"
    const newList = [...masterInvoiceList]
    dispatch(updateInvoiceList(newList))
  }
  return (
    <>
      <div>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Unapproved Invoices</h3>
                      <br />
                      <h5 className="mb-0">List of pending invoices</h5>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Invoice #</th>
                      <th scope="col">Customer</th>
                      <th scope="col">Type</th>
                      <th scope="col">Service Code</th>
                      <th scope="col">Total Amount (GHS)</th>
                      <th scope="col"> Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    {masterInvoiceList
                      .filter((item, i) => item.status === "pending")
                      .map((invoice, key) => (
                        //console.log('asas')
                        <tr key={key} id={invoice.invoiceNum}>
                          <th scope="row">{invoice.invoiceNum}</th>
                          <td>{invoice.customer}</td>
                          <td>{invoice.type}</td>
                          <td>{invoice.serviceCode}</td>
                          <td>
                            <i className="fas fa-arrow-up text-success mr-3" />
                            {moneyInTxt(invoice.total)}
                          </td>
                          <td>
                            <Button
                              id={invoice.invoiceNum}
                              color="success"
                              onClick={approve}
                              size="md"
                            >
                              Approve
                            </Button>
                            <Button
                              color="warning"
                              onClick={(e) => console.log("decline")}
                              size="md"
                            >
                              Decline
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
  );
};

export default Approval;
