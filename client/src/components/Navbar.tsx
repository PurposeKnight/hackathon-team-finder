import { Link, useLocation } from 'react-router-dom'
import { Home, User, MessageCircle } from 'lucide-react'

export default function Navbar() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            Dev-LFG
          </Link>
          
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                isActive('/') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              <Home size={20} />
              <span>Discover</span>
            </Link>
            
            <Link
              to="/matches"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                isActive('/matches') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              <MessageCircle size={20} />
              <span>Matches</span>
            </Link>
            
            <Link
              to="/profile"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                isActive('/profile') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              <User size={20} />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}