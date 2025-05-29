// src/components/EstimateDetail.jsx
import React, { useEffect, useState, useRef } from 'react'
import { generateClient } from 'aws-amplify/api'
import { getEstimate }   from '../graphql/queries'
import html2canvas       from 'html2canvas'
import { jsPDF }         from 'jspdf'

export default function EstimateDetail({ id, onBack }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const coverRef = useRef()
  const detailRef = useRef()

  if (!id) return <div style={{color:'red'}}>idが未指定です</div>

  // データ取得
  useEffect(() => {
    console.log('EstimateDetail id:', id)
    (async () => {
      try {
        const client = generateClient()
        const { data: d } = await client.graphql({
          query: getEstimate,
          variables: { id }
        })
        setData(d.getEstimate)
      } catch (e) {
        setError(e.message || 'データ取得エラー')
        console.error(e)
      }
    })()
  }, [id])

  // PDF出力（2ページ構成）
  const handlePdf = async () => {
    const coverCanvas = await html2canvas(coverRef.current, { scale: 2 })
    const detailCanvas = await html2canvas(detailRef.current, { scale: 2 })
    const pdf = new jsPDF('p', 'pt', 'a4')
    const pdfWidth  = pdf.internal.pageSize.getWidth()
    // 1ページ目
    const coverHeight = (coverCanvas.height * pdfWidth) / coverCanvas.width
    pdf.addImage(coverCanvas.toDataURL('image/png'), 'PNG', 0, 0, pdfWidth, coverHeight)
    // 2ページ目
    pdf.addPage()
    const detailHeight = (detailCanvas.height * pdfWidth) / detailCanvas.width
    pdf.addImage(detailCanvas.toDataURL('image/png'), 'PNG', 0, 0, pdfWidth, detailHeight)
    pdf.save(`estimate_${data.id}.pdf`)
  }

  if (error) return <div style={{color:'red'}}>エラー: {error}</div>
  if (!data) return <div>読み込み中…<br/>id: {id ? id : '未指定'}<br/>data: {JSON.stringify(data)}</div>

  // 発行者情報
  const issuer = {
    catchphrase: '癒し空間に流れる風を…',
    company: '庭想人株式会社',
    companyEn: 'NIWAOMOIBITO CO.,LTD',
    business: 'Garden ＆ Landscape Design＆Construction',
    address: '〒639-2153 奈良県葛城市太田２６２',
    ceo: '代表取締役 安井利典',
    telFax: 'TEL/FAX 0745-48-3057',
    mobile: '携帯 090-8937-1314',
    license: '奈良県知事許可　第17752号'
  }

  // 小計・消費税・合計金額計算
  const subtotal = data.items.items.reduce((sum, item) => sum + item.amount, 0)
  const designFee = data.designFee || 200000
  const miscFee = data.miscFee || 641088
  const discount = data.discount || 0
  const taxBase = subtotal + designFee + miscFee - discount
  const tax = Math.round(taxBase * 0.1)
  const total = taxBase + tax

  // 有効期限（発行日+30日と仮定）
  const issueDate = data.date
  const validDate = (() => {
    const d = new Date(issueDate)
    d.setDate(d.getDate() + 30)
    return d.toISOString().slice(0, 10)
  })()

  // 内訳テーブル用データ例
  const detailRows = Array.isArray(data.items?.items)
    ? data.items.items.map(item => ({
        content: item.unitPrice.item,
        attachment: item.attachment || '',
        spec: item.spec || '',
        quantity: item.quantity,
        unit: item.unit || '',
        unitPrice: item.unitPrice.price,
        amount: item.amount
      }))
    : []
  // 追加費用
  detailRows.push(kyosai51

    { content: '設計費', attachment: '', spec: '', quantity: '', unit: '', unitPrice: '', amount: designFee },
    { content: '諸経費（交通費込み）', attachment: '', spec: '', quantity: '', unit: '', unitPrice: '', amount: miscFee },
    { content: '小計', attachment: '', spec: '', quantity: '', unit: '', unitPrice: '', amount: subtotal + designFee + miscFee },
    { content: '出精値引き', attachment: '', spec: '', quantity: '', unit: '', unitPrice: '', amount: discount ? -discount : '' },
    { content: '消費税', attachment: '', spec: '', quantity: '', unit: '', unitPrice: '', amount: tax },
    { content: '合計', attachment: '', spec: '', quantity: '', unit: '', unitPrice: '', amount: total }
  )

  return (
    <div>
      <button onClick={onBack}>← 一覧に戻る</button>
      <button onClick={handlePdf} style={{ marginLeft:8 }}>
        PDFダウンロード
      </button>

      {/* 1ページ目：表紙 */}
      <div ref={coverRef} style={{ padding:48, marginTop:32, border:'1px solid #ccc', background:'#fff', maxWidth:800, margin:'32px auto 0', fontFamily:'"Noto Sans JP", sans-serif', minHeight:600 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div>
            <h1 style={{ fontSize:32, marginBottom:12 }}>見積書</h1>
            <div style={{ fontSize:15, marginBottom:8 }}>
              <div>見積書番号: <b>{data.estimateNumber || data.id}</b></div>
              <div>発行日: <b>{issueDate}</b></div>
              <div>有効期限: <b>{validDate}</b></div>
            </div>
          </div>
          <div style={{ textAlign:'right', fontSize:15, minWidth:260 }}>
            <div style={{ fontSize:12, color:'#4a7c59', marginBottom:2 }}>{issuer.catchphrase}</div>
            <div style={{ fontWeight:'bold', fontSize:19 }}>{issuer.company}</div>
            <div style={{ fontSize:12, color:'#888', marginBottom:2 }}>{issuer.companyEn}</div>
            <div style={{ fontSize:12, color:'#888', marginBottom:6 }}>{issuer.business}</div>
            <div>{issuer.address}</div>
            <div>{issuer.ceo}</div>
            <div>{issuer.telFax}</div>
            <div>{issuer.mobile}</div>
            <div style={{ marginTop:8, fontWeight:'bold', color:'#1a4' }}>{issuer.license}</div>
          </div>
        </div>
        <hr style={{ margin:'24px 0' }} />
        <div style={{ marginBottom:24, fontSize:17 }}>
          <b>御見積ご依頼主：</b>
          <div style={{ marginLeft:16 }}>
            <div>会社名: {data.customerName}</div>
            {data.customerAddress && <div>住所: {data.customerAddress}</div>}
            {data.customerPerson && <div>担当者: {data.customerPerson}</div>}
          </div>
        </div>
        <div style={{ margin:'48px 0', textAlign:'center' }}>
          <div style={{ fontSize:22, fontWeight:'bold', marginBottom:16 }}>御見積金額</div>
          <div style={{ fontSize:40, fontWeight:'bold', color:'#1a4', letterSpacing:2 }}>¥{total.toLocaleString()}</div>
        </div>
        <div style={{ marginTop:48, fontSize:14, color:'#888', textAlign:'right' }}>{issuer.license}</div>
        <div style={{ display:'flex', justifyContent:'flex-end', alignItems:'center', marginTop:32 }}>
          <div style={{ border:'1px solid #000', width:80, height:80, textAlign:'center', lineHeight:'80px', fontSize:18, marginRight:16 }}>
            印
          </div>
          <div style={{ fontSize:13, color:'#888' }}>（ご捺印ください）</div>
        </div>
      </div>

      {/* 2ページ目：内訳 */}
      <div ref={detailRef} style={{ padding:32, marginTop:48, border:'1px solid #ccc', background:'#fff', maxWidth:1000, margin:'48px auto 0', fontFamily:'"Noto Sans JP", sans-serif', minHeight:800 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:16 }}>
          <h2 style={{ fontSize:22, margin:0 }}>見積内訳書</h2>
          <div style={{ fontSize:14, color:'#1a4', fontWeight:'bold' }}>{issuer.license}</div>
        </div>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:14, marginBottom:24 }}>
          <thead>
            <tr>
              <th style={{ border:'1px solid #000', padding:6, background:'#f5f5f5' }}>内容</th>
              <th style={{ border:'1px solid #000', padding:6, background:'#f5f5f5' }}>別紙添付（有・無）</th>
              <th style={{ border:'1px solid #000', padding:6, background:'#f5f5f5' }}>仕様</th>
              <th style={{ border:'1px solid #000', padding:6, background:'#f5f5f5' }}>数量</th>
              <th style={{ border:'1px solid #000', padding:6, background:'#f5f5f5' }}>単位</th>
              <th style={{ border:'1px solid #000', padding:6, background:'#f5f5f5' }}>単価（円）</th>
              <th style={{ border:'1px solid #000', padding:6, background:'#f5f5f5' }}>金額（円）</th>
            </tr>
          </thead>
          <tbody>
            {detailRows.map((row, i) => (
              <tr key={i}>
                <td style={{ border:'1px solid #000', padding:6 }}>{row.content}</td>
                <td style={{ border:'1px solid #000', padding:6 }}>{row.attachment}</td>
                <td style={{ border:'1px solid #000', padding:6 }}>{row.spec}</td>
                <td style={{ border:'1px solid #000', padding:6, textAlign:'right' }}>{row.quantity}</td>
                <td style={{ border:'1px solid #000', padding:6 }}>{row.unit}</td>
                <td style={{ border:'1px solid #000', padding:6, textAlign:'right' }}>{row.unitPrice ? row.unitPrice.toLocaleString() : ''}</td>
                <td style={{ border:'1px solid #000', padding:6, textAlign:'right', fontWeight: i >= detailRows.length-6 ? 'bold' : 'normal', background: i >= detailRows.length-6 ? '#f0f0f0' : undefined }}>{row.amount !== '' ? (row.amount < 0 ? '-' : '') + '¥' + Math.abs(row.amount).toLocaleString() : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ fontSize:13, color:'#444', marginBottom:16 }}>
          <b>備考：</b>
          <div style={{ marginLeft:16 }}>
            {data.remarks || 'ご不明点等ございましたらご連絡ください。'}
          </div>
        </div>
        <div style={{ marginBottom:24, fontSize:13, color:'#444' }}>
          <b>特記事項：</b>
          <ul style={{ marginLeft:24, marginTop:8, marginBottom:0, paddingLeft:16 }}>
            <li>契約時は契約書を作成させて頂き、契約内容にて進めさせて頂きます。</li>
            <li>植栽植物には枯れ保証は含まれて居りません。</li>
            <li>御見積書記載項目以外は別途とさせて頂きます。</li>
            <li>工事中の電気・水道はご支給お願い致します。</li>
            <li>工事用車両の駐車スペース確保をお願い致します。</li>
            <li>工事着工後に必要となった作業については別途相談とさせて頂きます。</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
