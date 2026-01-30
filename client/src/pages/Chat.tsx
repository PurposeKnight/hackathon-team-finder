import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { io, Socket } from 'socket.io-client'
import { Conversation, Message } from '../../../shared/types'
import { api } from '../services/api'
import { Send } from 'lucide-react'

interface ChatProps {
  currentUserId: string
}

export default function Chat({ currentUserId }: ChatProps) {
  const { conversationId } = useParams<{ conversationId: string }>()
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [socket, setSocket] = useState<Socket | null>(null)
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!conversationId) return

    // Initialize socket connection
    const socketInstance = io('http://localhost:5000')
    setSocket(socketInstance)

    // Join conversation room
    socketInstance.emit('join-conversation', conversationId)

    // Listen for new messages
    socketInstance.on('new-message', (message: Message) => {
      setConversation(prev => {
        if (!prev) return prev
        return {
          ...prev,
          messages: [...prev.messages, message]
        }
      })
    })

    // Fetch conversation data
    fetchConversation()

    return () => {
      socketInstance.disconnect()
    }
  }, [conversationId])

  useEffect(() => {
    scrollToBottom()
  }, [conversation?.messages])

  const fetchConversation = async () => {
    if (!conversationId) return

    try {
      setLoading(true)
      const response = await api.get(`/chat/${conversationId}`)
      setConversation(response.data)
    } catch (error) {
      console.error('Failed to fetch conversation:', error)
    } finally {
      setLoading(false)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !socket || !conversationId) return

    const messageData = {
      conversationId,
      senderId: currentUserId,
      content: newMessage.trim()
    }

    // Emit via socket for real-time delivery
    socket.emit('send-message', messageData)
    
    setNewMessage('')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!conversation) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Conversation not found</h2>
      </div>
    )
  }

  const otherParticipant = conversation.participants.find(p => p !== currentUserId)

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden h-[600px] flex flex-col">
      {/* Header */}
      <div className="bg-primary-600 text-white p-4">
        <h2 className="text-xl font-semibold">
          Chat with {otherParticipant || 'Developer'}
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          conversation.messages.map((message, index) => (
            <MessageBubble
              key={index}
              message={message}
              isOwn={message.senderId === currentUserId}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={sendMessage} className="border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-primary-500 outline-none"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  )
}

interface MessageBubbleProps {
  message: Message
  isOwn: boolean
}

function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isOwn
            ? 'bg-primary-600 text-white'
            : 'bg-gray-200 text-gray-900'
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <p className={`text-xs mt-1 ${isOwn ? 'text-primary-200' : 'text-gray-500'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
    </div>
  )
}