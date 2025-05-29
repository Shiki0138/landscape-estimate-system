// src/components/InvoiceBuilder.jsx
import React, { useState } from 'react'
import { generateClient }       from 'aws-amplify/api'
import { createInvoice, createInvoiceItem } from '../graphql/mutations'

export default function InvoiceBuilder({ onCreated }) {
  const [customerName, setCustomerName] = useState('')
  const [date, setDate]                 = useState(new Date().toISOString().slice(0,10))
  const [dueDate, setDueDate]           = useState(new Date().toISOString().slice(0,10))
  const [lines, setLines]               = useState([{ description:'', unitPrice:0, quantity:1 }])

  const addLine = () => setLines([...lines, { description:'', unitPrice:0, quantity:1 }])
  const updateLine = (idx, field, val) => {
    const next = [...lines]; next[idx][field] = val; setLines(next)
  }

  const handleSave = async () => {
    const detailed = lines.map(l => ({
      ...l,
      amount: l.unitPrice * l.quantity
    }))
    const total = detailed.reduce((s,i)=>s + i.amount, 0)

    const client = generateClient()
    const res    = await client.graphql({
      query: createInvoice,
      variables: { input:{ customerName, date, dueDate, totalAmount: total } }
    })
    const invoiceID = res.data.createInvoice.id

    for (const row of detailed) {
      await client.graphql({
        query: createInvoiceItem,
        variables: {
          input:{
            invoiceID,
            description: row.description,
            unitPrice: row.unitPrice,
            quantity: row.quantity,
            amount: row.amount
          }
        }
      })
    }
    onCreated()
  }

  return (
    <div style={{ padding:16, border:'1px solid #ddd', marginBottom:16 }}>
      <h2>新規請求書作成</h2>
      <div>
        顧客名: <input value={customerName} onChange={e=>setCustomerName(e.target.value)} />
        <span style={{ marginLeft:16 }}>
          請求日: <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
        </span>
        <span style={{ marginLeft:16 }}>
          支払期限: <input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} />
        </span>
      </div>

      <table style={{ width:'100%', marginTop:16, borderCollapse:'collapse' }}>
        <thead>
          <tr>
            <th style={{border:'1px solid #ccc', padding:4}}>説明</th>
            <th style={{border:'1px solid #ccc', padding:4}}>単価</th>
            <th style={{border:'1px solid #ccc', padding:4}}>数量</th>
            <th style={{border:'1px solid #ccc', padding:4}}>金額</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((l,i) => (
            <tr key={i}>
              <td style={{border:'1px solid #ccc', padding:4}}>
                <input
                  value={l.description}
                  onChange={e=>updateLine(i,'description',e.target.value)}
                />
              </td>
              <td style={{border:'1px solid #ccc', padding:4}}>
                <input
                  type="number"
                  value={l.unitPrice}
                  onChange={e=>updateLine(i,'unitPrice',parseFloat(e.target.value))}
                  style={{width:80}}
                />
              </td>
              <td style={{border:'1px solid #ccc', padding:4}}>
                <input
                  type="number"
                  value={l.quantity}
                  onChange={e=>updateLine(i,'quantity',parseInt(e.target.value,10))}
                  style={{width:60}}
                />
              </td>
              <td style={{border:'1px solid #ccc', padding:4}}>
                ¥{(l.unitPrice * l.quantity).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop:8 }}>
        <button onClick={addLine}>行を追加</button>
        <button onClick={handleSave} style={{ marginLeft:8 }}>請求書を保存</button>
      </div>
    </div>
  )
}