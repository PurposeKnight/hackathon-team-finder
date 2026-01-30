import { useState, useEffect } from 'react'
import { User } from '../../../shared/types'
import SwipeCard from '../components/SwipeCard'
import { api } from '../services/api'

interface HomeProps {
  currentUserId: string
}

export default function Home({ currentUserId }: HomeProps) {
  const [users, setUsers] = useState<User[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [matchMessage, setMatchMessage] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [currentUserId])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/users/discover/${currentUserId}`)
      setUsers(response.data)
      setCurrentIndex(0)
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (currentIndex >= users.length) return

    const targetUser = users[currentIndex]
    
    if (direction === 'right') {
      try {
        const response = await api.post('/swipe', {
          fromUserId: currentUserId,
          toUserId: targetUser._id,
          action: 'like'
        })

        if (response.data.isMatch) {
          setMatchMessage(response.data.message)
          setTimeout(() => setMatchMessage(null), 3000)
        }
      } catch (error) {
        console.error('Failed to process like:', error)
      }
    }

    setCurrentIndex(prev => prev + 1)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (currentIndex >= users.length) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No more developers to discover!</h2>
        <p className="text-gray-600 mb-6">Check back later for new profiles.</p>
        <button
          onClick={fetchUsers}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Refresh
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      {matchMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {matchMessage}
        </div>
      )}
      
      <div className="relative h-[600px]">
        {users.slice(currentIndex, currentIndex + 2).map((user, index) => (
          <div
            key={user._id}
            className="absolute inset-0"
            style={{ zIndex: 2 - index }}
          >
            <SwipeCard
              user={user}
              onSwipe={index === 0 ? handleSwipe : () => {}}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          {users.length - currentIndex} developers remaining
        </p>
      </div>
    </div>
  )
}