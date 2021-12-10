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
  const [formData, gridData, setFormData, setGridData, setShowNewInvoiceModal] =
    useContext(FormContext)

  useEffect(() => {
    console.log('GridData in Preview: ', gridData)

    return () => {
      //cleanup
    }
  }, [gridData])

  return (
    <Card
      className='shadow'
      style={{ width: '55%', marginLeft: '10px', padding: '30px' }}
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
        <h5>{formData.businessUnit}</h5>
        <h5>{formData.invoiceType}</h5>
      </div>
      <div style={styles.body}>
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
          <tbody>
            {gridData.map((item, key) => (
              <tr key={key}>
                <td>{item.serviceCode}</td>
                <td>{item.description}</td>
                <td>{moneyInTxt(item.quantity)}</td>
                <td>{item.price}</td>
                <td>{moneyInTxt(item.price * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Card>
  )
}

const styles = {
  header: {
    display: 'flex',
    height: '22%',
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
    height: '15%',
    backgroundColor: '#eff4fd',
    borderRadius: 10,
    padding: 10,
  },
  body: {
    marginTop: 50,
    height: '30%',
    overflow: 'auto',
  },
}

export default InvoicePreview
