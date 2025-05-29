// src/components/EstimateBuilder.jsx
import React, { useState, useEffect } from 'react'
import { generateClient } from 'aws-amplify/api'
import { listUnitPrices } from '../graphql/queries'
import { createEstimate, createEstimateItem } from '../graphql/mutations'

export default function EstimateBuilder({ onCreated }) {
  const [unitPrices, setUnitPrices]     = useState([])
  const [lines, setLines]               = useState([])
  const [customerName, setCustomerName] = useState('')
  const [date, setDate]                 = useState(new Date().toISOString().slice(0,10))

  // 単価データを事前取得
  useEffect(() => {
    (async () => {
      const client = generateClient()
      const { data } = await client.graphql({ query: listUnitPrices })
      setUnitPrices(data.listUnitPrices.items)
    })()
  }, [])

  // 行追加・編集
  const addLine = () => setLines([...lines, { unitPriceID: '', quantity: 1 }])
  const updateLine = (idx, field, value) => {
    const next = [...lines]
    next[idx][field] = value
    setLines(next)
  }

  // 見積保存
  const handleSave = async () => {
    // 明細ごとに金額計算
    const detailed = lines.map(l => {
      const up = unitPrices.find(u => u.id === l.unitPriceID)
      return { ...l, amount: up.price * l.quantity }
    })
    const total = detailed.reduce((sum, i) => sum + i.amount, 0)

    const client = generateClient()
    // Estimate ヘッダ作成
    const res = await client.graphql({
      query: createEstimate,
      variables: { input: { customerName, date, totalAmount: total } }
    })
    const estimateID = res.data.createEstimate.id

    // 明細作成
    for (const row of detailed) {
      await client.graphql({
        query: createEstimateItem,
        variables: {
          input: {
            estimateID,
            unitPriceID: row.unitPriceID,
            quantity: row.quantity,
            amount: row.amount
          }
        }
      })
    }

    onCreated()
  }

  return (
    <div style={{ padding:'1rem', border:'1px solid #ddd', marginBottom:'1rem' }}>
      <h2>新規見積書作成</h2>
      <div style={{ marginBottom:'0.5rem' }}>
        顧客名：<input value={customerName} onChange={e => setCustomerName(e.target.value)} />
        <span style={{ marginLeft:16 }}>
          日付：<input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </span>
      </div>
      <table style={{ width:'100%', borderCollapse:'collapse' }}>
        <thead>
          <tr>
            <th style={{ border:'1px solid #ccc', padding:'4px' }}>品目</th>
            <th style={{ border:'1px solid #ccc', padding:'4px' }}>単価</th>
            <th style={{ border:'1px solid #ccc', padding:'4px' }}>数量</th>
            <th style={{ border:'1px solid #ccc', padding:'4px' }}>金額</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((l, i) => {
            const up = unitPrices.find(u => u.id === l.unitPriceID)
            return (
              <tr key={i}>
                <td style={{ border:'1px solid #ccc', padding:'4px' }}>
                  <select
                    value={l.unitPriceID}
                    onChange={e => updateLine(i, 'unitPriceID', e.target.value)}
                  >
                    <option value="">—選択—</option>
                    {unitPrices.map(u => (
                      <option key={u.id} value={u.id}>
                        {u.item}({u.unit}) ¥{u.price.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </td>
                <td style={{ border:'1px solid #ccc', padding:'4px' }}>
                  {up ? up.price.toLocaleString() : '-'}
                </td>
                <td style={{ border:'1px solid #ccc', padding:'4px' }}>
                  <input
                    type="number"
                    value={l.quantity}
                    onChange={e => updateLine(i, 'quantity', parseInt(e.target.value,10))}
                    style={{ width:'4rem' }}
                  />
                </td>
                <td style={{ border:'1px solid #ccc', padding:'4px' }}>
                  {up ? (up.price * l.quantity).toLocaleString() : '-'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div style={{ marginTop:'0.5rem' }}>
        <button onClick={addLine}>行を追加</button>
        <button onClick={handleSave} style={{ marginLeft:8 }}>見積を保存</button>
      </div>
    </div>
  )
}