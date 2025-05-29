// src/main.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Amplify の設定を一度だけ行う
import { Amplify } from 'aws-amplify'
import awsExports from './aws-exports'
import '@aws-amplify/ui-react/styles.css'

Amplify.configure(awsExports)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)