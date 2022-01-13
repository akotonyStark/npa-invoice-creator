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
    //console.log('GridData in Preview: ', gridData)

    return () => {
      //cleanup
    }
  }, [gridData])

  return (
    <Card
      className='shadow'
      style={{
        width: '58%',
        height: '750px',
        marginLeft: '10px',
        padding: '30px',
      }}
    >
      <div style={styles.header}>
        <div style={styles.leftHeader}>
          <span
            className='avatar rounded-circle'
            style={{ width: 80, height: 80, marginBottom: 10 }}
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
          {/* <h5>#OMC2111005</h5> */}
          <h5>Issed on: 12/12/2021</h5>
          <h5>Due Date: 12/12/2021</h5>
        </div>
      </div>
      <div style={styles.title}>
        <h4>Invoice for</h4>
        <h5>{formData.customerName}</h5>
        <h5>{formData.invoiceType}</h5>
      </div>
      {/* <div style={styles.tablehead}>
        <Table className='align-items-center table-flush' responsive>
          <thead className='thead-light'>
            <tr>
              <th scope='col' style={{width:'60% !important' }}>Service Code</th>
              <th scope='col' style={{width:'30%'}}>Desc</th>
              <th scope='col' style={{width:'10%'}}>Quantity</th>
              <th scope='col' style={{width:'20%'}}>Price</th>
              <th scope='col' style={{width:'20%'}}>Ext</th>
            </tr>
          </thead>
        </Table>
      </div> */}
      <div style={styles.body}>
        <Table className='table-flush' responsive>
          <thead className='thead'>
            <tr style={{ lineHeight: '10px' }}>
              <th scope='col' style={{ width: '10% !important' }}>
                {' '}
                Code
              </th>
              <th scope='col' style={{ width: '30%' }}>
                Desc
              </th>
              <th scope='col' style={{ width: '10%', textAlign: 'right' }}>
                Quantity
              </th>
              <th scope='col' style={{ width: '20%', textAlign: 'right' }}>
                Price
              </th>
              <th scope='col' style={{ width: '20%', textAlign: 'right' }}>
                Ext
              </th>
            </tr>
          </thead>
          <tbody>
            {gridData.map((item, key) => (
              <tr style={{ lineHeight: '1px' }} key={key}>
                <td style={{ fontSize: '10px' }}>{item.serviceCode}</td>
                <td style={{ fontSize: '10px' }}>{item.description}</td>
                <td style={{ fontSize: '10px', textAlign: 'right' }}>
                  {moneyInTxt(item.quantity)}
                </td>
                <td style={{ fontSize: '10px', textAlign: 'right' }}>
                  {moneyInTxt(item.price)}
                </td>
                <td style={{ fontSize: '10px', textAlign: 'right' }}>
                  {moneyInTxt(item.ext)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div style={styles.footer}>
        <div style={styles.total}>
          <h5>
            Total (GHS) {'   '}
            {moneyInTxt(gridData.reduce((total, item) => total + item.ext, 0))}
          </h5>
        </div>
      </div>
      <div style={styles.bottomcomments}>
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
    marginBottom: 20,
  },
  bottomcomments: {
    display: 'flex',
    justifyContent: 'space-between',
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
    height: '14%',
    backgroundColor: '#eff4fd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 25,
  },
  body: {
    marginTop: 0,
    height: '280px',
    maxHeight: '280px',
    overflow: 'auto',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    height: '10%',
    overflow: 'auto',
  },
  total: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginLeft: '40%',
    borderTop: '1px  solid #e3e3e3',
    paddingTop: 10,
    //paddingRight: 50,
    marginTop: 10,
  },
  comments: {
    height: 100,
    width: '47%',
    overflow: 'auto',
    flexDirection: 'row',
    backgroundColor: '#eff4fd',
    borderRadius: 10,
    padding: 10,
    color: '#cecece',
    marginTop: 40,
  },

  tablehead: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
}

export default InvoicePreview
