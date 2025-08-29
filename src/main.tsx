import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthCard } from './components/AuthCard'
import Debug from './pages/Debug'

createRoot(document.getElementById('root')!).render(
  <Router>
    <Routes>
      <Route path="/" element={<AuthCard />} />
      <Route path="/debug" element={<Debug />} />
    </Routes>
  </Router>
)
