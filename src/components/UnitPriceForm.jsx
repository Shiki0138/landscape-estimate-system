// src/components/UnitPriceForm.jsx
import React, { useState } from 'react'
import { generateClient } from 'aws-amplify/api'
import { createUnitPrice } from '../graphql/mutations'

export default function UnitPriceForm({ onCreated }) {
  const [item, setItem]   = useState('')
  const [unit, setUnit]   = useState('')
  const [price, setPrice] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!item || !price) {
      return alert('「品目」と「価格」は必須です')
    }
    try {
      const client = generateClient()
      await client.graphql({
        query: createUnitPrice,
        variables: { input: { item, unit: unit||null, price: parseFloat(price) } }
      })
      setItem(''); setUnit(''); setPrice('')
      onCreated()
    } catch (err) {
      console.error(err)
      alert('作成に失敗しました')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="品目"
        value={item}
        onChange={e => setItem(e.target.value)}
        required
        style={{ marginRight: '0.5rem' }}
      />
      <input
        type="text"
        placeholder="単位"
        value={unit}
        onChange={e => setUnit(e.target.value)}
        style={{ marginRight: '0.5rem' }}
      />
      <input
        type="number"
        placeholder="価格"
        value={price}
        onChange={e => setPrice(e.target.value)}
        required
        style={{ marginRight: '0.5rem', width: '6rem' }}
      />
      <button type="submit">追加</button>
    </form>
  )
}