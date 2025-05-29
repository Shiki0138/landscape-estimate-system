// src/components/InvoiceDetail.jsx
import React, { useEffect, useState, useRef } from 'react'
import { generateClient } from 'aws-amplify/api'
import { getInvoice }     from '../graphql/queries'
import html2canvas       from 'html2canvas'
import { jsPDF }         from 'jspdf'

export default function InvoiceDetail({ id, onBack }) {
  const [data, setData] = useState(null)
  const ref = useRef()

  // 1) 請求書データ取得
  useEffect(() => {
    (async () => {
      const client = generateClient()
      const { data: response } = await client.graphql({
        query: getInvoice,
        variables: { id }
      })
      setData(response.getInvoice)
    })()
  }, [id])

  // 2) PDF 出力
  const handlePdf = async () => {
    if (!ref.current) return
    const canvas = await html2canvas(ref.current, { scale: 2 })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'pt', 'a4')
    const width = pdf.internal.pageSize.getWidth()
    const height = (canvas.height * width) / canvas.width
    pdf.addImage(imgData, 'PNG', 0, 0, width, height)
    pdf.save(`invoice_${data.id}.pdf`)
  }

  if (!data) return <p>読み込み中…</p>

  return (
    <div>
      <button onClick={onBack}>← 一覧に戻る</button>
      <button onClick={handlePdf} style={{ marginLeft: 8 }}>PDFダウンロード</button>

      <div ref={ref} style={{ padding: 16, marginTop: 16, border: '1px solid #ccc' }}>
        <h2>請求書</h2>
        <p>顧客名: {data.customerName}</p>
        <p>請求日: {data.date}</p>
        <p>支払期限: {data.dueDate}</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #000', padding: 4 }}>説明</th>
              <th style={{ border: '1px solid #000', padding: 4 }}>単価</th>
              <th style={{ border: '1px solid #000', padding: 4 }}>数量</th>
              <th style={{ border: '1px solid #000', padding: 4 }}>金額</th>
            </tr>
          </thead>
          <tbody>
            {(data.items?.items || []).map(item => (
              <tr key={item.id}>
                <td style={{ border: '1px solid #000', padding: 4 }}>{item.description}</td>
                <td style={{ border: '1px solid #000', padding: 4 }}>¥{item.unitPrice.toLocaleString()}</td>
                <td style={{ border: '1px solid #000', padding: 4 }}>{item.quantity}</td>
                <td style={{ border: '1px solid #000', padding: 4 }}>¥{item.amount.toLocaleString()}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={3} style={{ textAlign: 'right', padding: 4 }}>合計金額</td>
              <td style={{ border: '1px solid #000', padding: 4 }}>¥{data.totalAmount.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}