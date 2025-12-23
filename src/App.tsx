import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import WordEntry from './pages/WordEntry'
import Results from './pages/Results'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<WordEntry />} />
        <Route path="/:id/view" element={<Results />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
