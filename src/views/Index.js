import { useState, useEffect, createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, loadInvoice, saveInvoice } from "../actions";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

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

export const AppContext = createContext(null);

const Index = (props) => {
  //select redux store states
  const masterInvoiceList = useSelector((state) => state.masterInvoiceList);
  //const counter = useSelector((state) => state.counter);

  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  const [invoiceList, setInvoiceList] = useState(masterInvoiceList);

  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch(increment());
    dispatch(loadInvoice());
    console.log("InvoiceList State = ", masterInvoiceList);

    return () => {
      //cleanup;
    };
  }, [invoiceList]);

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
                      <h3 className="mb-0">Invoices</h3>
                      {/* <h3>{counter}</h3>
                      <Button onClick={() => dispatch(increment())}>
                        Incremment
                      </Button>
                      <Button onClick={() => dispatch(decrement())}>
                        Decerement
                      </Button> */}
                      <br />
                      <h5 className="mb-0">List of all invoices</h5>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) =>
                          setShowNewInvoiceModal(!showNewInvoiceModal)
                        }
                        size="md"
                      >
                        + New Invoice
                      </Button>
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
                    </tr>
                  </thead>
                  <tbody>
                    {masterInvoiceList
                      .filter((item) => item.status !== "pending")
                      .map((invoice, key) => (
                        <tr key={key}>
                          <th scope="row">{invoice.invoiceNum}</th>
                          <td>{invoice.customer}</td>
                          <td>{invoice.type}</td>
                          <td>{invoice.serviceCode}</td>
                          <td>
                            <i className="fas fa-arrow-up text-success mr-3" />
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
  );
};

export default Index;
