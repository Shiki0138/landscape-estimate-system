// src/components/InvoiceList.jsx
import React, { useEffect, useState } from 'react'
import { generateClient } from 'aws-amplify/api'
import { listInvoices }  from '../graphql/queries'

export default function InvoiceList({ onSelect }) {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const client = generateClient()
        const { data } = await client.graphql({ query: listInvoices })
        setInvoices(data.listInvoices.items)
      } catch (err) {
        console.error(err)
        setError(err)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <p>読み込み中…</p>
  if (error)   return <p style={{ color: 'red' }}>エラーが発生しました。</p>
  if (invoices.length === 0) return <p>作成済みの請求書がありません。</p>

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ccc', padding: 8 }}>顧客名</th>
          <th style={{ border: '1px solid #ccc', padding: 8 }}>請求日</th>
          <th style={{ border: '1px solid #ccc', padding: 8 }}>支払期限</th>
          <th style={{ border: '1px solid #ccc', padding: 8 }}>合計金額</th>
          <th style={{ border: '1px solid #ccc', padding: 8 }}>操作</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map(inv => (
          <tr key={inv.id}>
            <td style={{ border: '1px solid #ccc', padding: 8 }}>{inv.customerName}</td>
            <td style={{ border: '1px solid #ccc', padding: 8 }}>{inv.date}</td>
            <td style={{ border: '1px solid #ccc', padding: 8 }}>{inv.dueDate}</td>
            <td style={{ border: '1px solid #ccc', padding: 8 }}>
              ¥{inv.totalAmount.toLocaleString()}
            </td>
            <td style={{ border: '1px solid #ccc', padding: 8 }}>
              <button onClick={() => onSelect(inv.id)}>詳細</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}