
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import AppLayout from './AppLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Documents from './pages/Documents.jsx'
import Flashcards from './pages/Flashcards.jsx'
import Chat from './pages/Chat.jsx'
import Quiz from './pages/Quiz.jsx'
import LandingPage from './pages/LandingPage.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/quiz" element={<Quiz />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App