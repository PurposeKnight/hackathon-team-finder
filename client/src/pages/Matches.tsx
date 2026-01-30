import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Match, User } from '../../../shared/types'
import { api } from '../services/api'
import { MessageCircle } from 'lucide-react'

interface MatchesProps {
  currentUserId: string
}

export default function Matches({ currentUserId }: MatchesProps) {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMatches()
  }, [currentUserId])

  const fetchMatches = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/swipe/matches/${currentUserId}`)
      setMatches(response.data)
    } catch (error) {
      console.error('Failed to fetch matches:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (matches.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">💔</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No matches yet</h2>
        <p className="text-gray-600 mb-6">Start swiping to find your coding partners!</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Start Discovering
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Matches</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <MatchCard
            key={match._id}
            match={match}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  )
}

interface MatchCardProps {
  match: Match
  currentUserId: string
}

function MatchCard({ match, currentUserId }: MatchCardProps) {
  const [otherUser, setOtherUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOtherUser()
  }, [match])

  const fetchOtherUser = async () => {
    try {
      const otherUserId = match.user1Id === currentUserId ? match.user2Id : match.user1Id
      const response = await api.get(`/users/${otherUserId}`)
      setOtherUser(response.data)
    } catch (error) {
      console.error('Failed to fetch user:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !otherUser) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 bg-gray-200 rounded mb-4"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {otherUser.name.charAt(0).toUpperCase()}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">{otherUser.name}</h3>
            <p className="text-sm text-gray-600">
              Matched {new Date(match.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{otherUser.bio}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          {otherUser.techStack.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {otherUser.techStack.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
              +{otherUser.techStack.length - 3} more
            </span>
          )}
        </div>

        <Link
          to={`/chat/${match.conversationId}`}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <MessageCircle size={16} />
          <span>Start Chat</span>
        </Link>
      </div>
    </div>
  )
}