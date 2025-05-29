// src/components/CsvImport.jsx
import React, { useState } from 'react'
import Papa from 'papaparse'
import { generateClient } from 'aws-amplify/api'
import { createUnitPrice } from '../graphql/mutations'

export default function CsvImport({ onImported }) {
  const [loading, setLoading] = useState(false)

  const handleFile = e => {
    const file = e.target.files[0]
    if (!file) return
    setLoading(true)
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async results => {
        try {
          const client = generateClient()
          for (const row of results.data) {
            await client.graphql({
              query: createUnitPrice,
              variables: {
                input: {
                  item: row.item,
                  unit: row.unit || null,
                  price: parseFloat(row.price)
                }
              }
            })
          }
          onImported()
        } catch (err) {
          console.error('CSV import error:', err)
          alert('CSVインポート中にエラーが発生しました')
        } finally {
          setLoading(false)
        }
      }
    })
  }

  return (
    <div style={{ margin: '1rem 0' }}>
      <input type="file" accept=".csv" onChange={handleFile} disabled={loading} />
      {loading && <p>インポート中…</p>}
    </div>
  )
}
