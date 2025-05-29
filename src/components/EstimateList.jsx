// src/components/EstimateList.jsx
import React, { useEffect, useState } from 'react'
import { generateClient }           from 'aws-amplify/api'
import { listEstimates }            from '../graphql/queries'

export default function EstimateList({ onSelect }) {
  const [estimates, setEstimates] = useState([])
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    ;(async () => {
      const client = generateClient()
      const { data } = await client.graphql({ query: listEstimates })
      setEstimates(data.listEstimates.items)
      setLoading(false)
    })()
  }, [])

  if (loading) return <p>読み込み中…</p>
  if (estimates.length === 0) return <p>作成済みの見積がありません。</p>

  return (
    <table style={{ width:'100%', borderCollapse:'collapse' }}>
      <thead>
        <tr>
          <th>顧客名</th><th>日付</th><th>合計金額</th><th>操作</th>
        </tr>
      </thead>
      <tbody>
        {estimates.map(e => (
          <tr key={e.id}>
            <td style={{padding:8, border:'1px solid #ccc'}}>{e.customerName}</td>
            <td style={{padding:8, border:'1px solid #ccc'}}>{e.date}</td>
            <td style={{padding:8, border:'1px solid #ccc'}}>¥{e.totalAmount.toLocaleString()}</td>
            <td style={{padding:8, border:'1px solid #ccc'}}>
              <button onClick={() => onSelect(e.id)}>詳細</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}