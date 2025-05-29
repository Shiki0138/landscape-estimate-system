// src/components/UnitPriceList.jsx
import React, { useEffect, useState } from 'react'
import { generateClient } from 'aws-amplify/api'
import { listUnitPrices } from '../graphql/queries'
import UnitPriceForm from './UnitPriceForm'
import UnitPriceActions from './UnitPriceActions'   // Edit/Delete 用アクション
import CsvImport from './CsvImport'                 // CSV 一括インポート用

export default function UnitPriceList() {
  const [items, setItems]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  // DynamoDB から単価データを取得
  const fetchData = async () => {
    setLoading(true)
    try {
      const client   = generateClient()
      const { data } = await client.graphql({ query: listUnitPrices })
      setItems(data.listUnitPrices.items)
    } catch (err) {
      console.error('GraphQL fetch error:', err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // フォームやアクション後に再取得
  const onCreated = () => fetchData()
  const onUpdated = () => fetchData()
  const onDeleted = () => fetchData()
  const onImported = () => fetchData()

  return (
    <div style={{ padding: '1rem' }}>
    
      {/* 1. 単価追加フォーム */}
      <UnitPriceForm onCreated={onCreated} />

      {/* 2. CSV 一括インポート */}
      <CsvImport onImported={onImported} />

      {/* 3. 読み込み／エラー表示 */}
      {loading && <p>読み込み中…</p>}
      {error   && <p style={{ color: 'red' }}>エラーが発生しました。コンソールを確認してください。</p>}

      {/* 4. ロード完了後の一覧 or 空メッセージ */}
      {!loading && !error && (
        items.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>品目</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>単位</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>価格</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {items.map(u => (
                <tr key={u.id}>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{u.item}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{u.unit || '-'}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{u.price.toLocaleString()}</td>
                  {/* 5. 編集・削除ボタン */}
                  <UnitPriceActions
                    item={u}
                    onUpdated={onUpdated}
                    onDeleted={onDeleted}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>単価データがありません。</p>
        )
      )}
    </div>
  )
}