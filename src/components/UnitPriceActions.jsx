// src/components/UnitPriceActions.jsx
import React, { useState } from 'react'
import { generateClient } from 'aws-amplify/api'
import { updateUnitPrice, deleteUnitPrice } from '../graphql/mutations'

export default function UnitPriceActions({ item, onUpdated, onDeleted }) {
  const [editing, setEditing] = useState(false)
  const [unit, setUnit]       = useState(item.unit || '')
  const [price, setPrice]     = useState(item.price)

  // 更新
  const handleUpdate = async () => {
    try {
      const client = generateClient()
      await client.graphql({
        query: updateUnitPrice,
        variables: {
          input: { id: item.id, item: item.item, unit: unit || null, price: parseFloat(price) }
        }
      })
      setEditing(false)
      onUpdated()
    } catch (e) {
      console.error(e)
      alert('更新に失敗しました')
    }
  }

  // 削除
  const handleDelete = async () => {
    if (!window.confirm('本当に削除しますか？')) return
    try {
      const client = generateClient()
      await client.graphql({
        query: deleteUnitPrice,
        variables: { input: { id: item.id } }
      })
      onDeleted()
    } catch (e) {
      console.error(e)
      alert('削除に失敗しました')
    }
  }

  return editing ? (
    <td colSpan={4}>
      <input value={unit} onChange={e => setUnit(e.target.value)} placeholder="単位" style={{ marginRight:4 }} />
      <input value={price} onChange={e => setPrice(e.target.value)} placeholder="価格" style={{ width:'6rem', marginRight:4 }} />
      <button onClick={handleUpdate}>保存</button>
      <button onClick={() => setEditing(false)} style={{ marginLeft:4 }}>キャンセル</button>
    </td>
  ) : (
    <td>
      <button onClick={() => setEditing(true)} style={{ marginRight:4 }}>編集</button>
      <button onClick={handleDelete}>削除</button>
    </td>
  )
}