import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Matches from './pages/Matches'
import Chat from './pages/Chat'

function App() {
  const [currentUserId, setCurrentUserId] = useState<string>('675f1234567890abcdef1234') // Mock user ID

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home currentUserId={currentUserId} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/matches" element={<Matches currentUserId={currentUserId} />} />
          <Route path="/chat/:conversationId" element={<Chat currentUserId={currentUserId} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App