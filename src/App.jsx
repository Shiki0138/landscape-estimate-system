// src/App.jsx
import React, { useState } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'

import UnitPriceList    from './components/UnitPriceList'
import EstimateBuilder  from './components/EstimateBuilder'
import EstimateList     from './components/EstimateList'
import EstimateDetail   from './components/EstimateDetail'
import InvoiceBuilder   from './components/InvoiceBuilder'   // ← 請求書作成用
import InvoiceList      from './components/InvoiceList'      // ← 請求書一覧用
import InvoiceDetail    from './components/InvoiceDetail'    // ← 請求書詳細用

function App() {
  const [mode, setMode]           = useState('unit')    
  const [selectedEstimateId, setSelectedEstimateId] = useState(null)
  const [selectedInvoiceId, setSelectedInvoiceId]   = useState(null)

  return (
    <div style={{ padding: '1rem' }}>
      <h1>見積・請求システム</h1>

      {/* ナビゲーション */}
      <nav style={{ marginBottom: 16 }}>
        <button onClick={() => setMode('unit')}>単価管理</button>
        <button onClick={() => setMode('estimate-create')} style={{ marginLeft: 8 }}>
          見積作成
        </button>
        <button onClick={() => setMode('estimate-list')} style={{ marginLeft: 8 }}>
          見積一覧
        </button>
        <button onClick={() => setMode('invoice-create')} style={{ marginLeft: 8 }}>
          請求書作成
        </button>
        <button onClick={() => setMode('invoice-list')} style={{ marginLeft: 8 }}>
          請求書一覧
        </button>
      </nav>

      {/* 単価管理 */}
      {mode === 'unit' && <UnitPriceList />}

      {/* 見積作成 */}
      {mode === 'estimate-create' && (
        <EstimateBuilder onCreated={() => setMode('estimate-list')} />
      )}

      {/* 見積一覧 */}
      {mode === 'estimate-list' && (
        <EstimateList onSelect={id => { setSelectedEstimateId(id); setMode('estimate-detail'); }} />
      )}

      {/* 見積詳細 */}
      {mode === 'estimate-detail' && selectedEstimateId && (
        <EstimateDetail id={selectedEstimateId} onBack={() => setMode('estimate-list')} />
      )}

      {/* 請求書作成 */}
      {mode === 'invoice-create' && (
        <InvoiceBuilder onCreated={() => setMode('invoice-list')} />
      )}

      {/* 請求書一覧 */}
      {mode === 'invoice-list' && (
        <InvoiceList onSelect={id => { setSelectedInvoiceId(id); setMode('invoice-detail'); }} />
      )}

      {/* 請求書詳細 */}
      {mode === 'invoice-detail' && selectedInvoiceId && (
        <InvoiceDetail id={selectedInvoiceId} onBack={() => setMode('invoice-list')} />
      )}
    </div>
  )
}

export default withAuthenticator(App)