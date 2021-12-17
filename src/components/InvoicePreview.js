import React, { useState, useContext, useEffect } from 'react'
import { Card, Table } from 'reactstrap'

import { FormContext } from './Modals/NewInvoice'

const moneyInTxt = (value, standard, dec = 2) => {
  var nf = new Intl.NumberFormat(standard, {
    minimumFractionDigits: dec,
    maximumFractionDigits: 2,
  })
  return nf.format(Number(value) ? value : 0.0)
}

function InvoicePreview() {
  const [
    formData,
    gridData,
    setFormData,
    setGridData,
    setShowNewInvoiceModal,
    init,
    comments,
    setComments,
  ] = useContext(FormContext)

  useEffect(() => {
    console.log('GridData in Preview: ', gridData)

    return () => {
      //cleanup
    }
  }, [gridData])

  return (
    <Card
      className='shadow'
      style={{ width: '58%', marginLeft: '10px', padding: '30px' }}
    >
      <div style={styles.header}>
        <div style={styles.leftHeader}>
          <span
            className='avatar rounded-circle'
            style={{ width: 100, height: 100 }}
          >
            <img src={require('../assets/img/theme/npa.png').default} />
          </span>

          <h5>
            No. 6 George W. Bush Highway <br /> Adj. Petroleum Commission
            <br />
            Dzorwulu Accra.
          </h5>
        </div>

        <div style={styles.rightHeader}>
          <h3>INVOICE</h3>
          <h5>#OMC2111005</h5>
          <h5>Issed on: 12/12/2021</h5>
          <h5>Due Date: 12/12/2021</h5>
        </div>
      </div>
      <div style={styles.title}>
        <h4>Invoice for</h4>
        <h5>{formData.customerName}</h5>
        <h5>{formData.invoiceType}</h5>
      </div>
      <div style={styles.tablehead}>
        <Table className='align-items-center table-flush' responsive>
          <thead className='thead-light'>
            <tr>
              <th scope='col'>Service Code</th>
              {/* <th scope='col'>Item Code</th> */}
              <th scope='col'>Desc</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Price</th>
              <th scope='col'>Ext</th>
            </tr>
          </thead>
        </Table>
      </div>
      <div style={styles.body}>
        <Table className='align-items-center table-flush' responsive>
          <tbody>
            {gridData.map((item, key) => (
              <tr key={key}>
                <td>{item.serviceCode}</td>
                <td>{item.description}</td>
                <td>{moneyInTxt(item.quantity)}</td>
                <td>{item.price}</td>
                <td>{moneyInTxt(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div style={styles.footer}>
        <div style={styles.total}>
          <h5>
            Total (GHS) {'   '}
            {moneyInTxt(
              gridData.reduce((total, item) => total + item.total, 0)
            )}
          </h5>
        </div>
        <div style={styles.comments}>
          <h5>{comments}</h5>
        </div>
      </div>
    </Card>
  )
}

const styles = {
  header: {
    display: 'flex',
    height: '20%',
  },
  leftHeader: {
    display: 'flex',
    width: '50%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    //border: '1px solid blue',
  },
  rightHeader: {
    display: 'flex',
    width: '50%',
    flexDirection: 'column',
    alignItems: 'flex-end',
    //border: '1px solid green',
  },
  title: {
    height: '11%',
    backgroundColor: '#eff4fd',
    borderRadius: 10,
    padding: 10,
  },
  body: {
    marginTop: 0,
    height: '30%',
    overflow: 'auto',
    position: 'relative',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 50,
    height: '30%',
    overflow: 'auto',
  },
  comments: {
    height: '30%',
    width: '50%',
    overflow: 'auto',
    flexDirection: 'row',
    backgroundColor: '#eff4fd',
    borderRadius: 10,
    padding: 10,
    color: '#cecece',
    marginTop: 100,
  },
  total: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: '20%',
    width: '50%',
    overflow: 'auto',
    marginLeft: 10,
    borderTop: '1px  solid #e3e3e3',
    paddingTop: 10,
    // marginTop: 50,
  },
  tablehead: {
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
}

export default InvoicePreview
