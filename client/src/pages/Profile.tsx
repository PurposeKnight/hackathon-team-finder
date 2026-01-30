import { useState } from 'react'
import { User } from '../../../shared/types'
import { Github, Linkedin, MapPin, Plus, X } from 'lucide-react'

export default function Profile() {
  const [user, setUser] = useState<Partial<User>>({
    name: 'Alex Developer',
    email: 'alex@example.com',
    bio: 'Full-stack developer passionate about building innovative solutions. Love working with modern web technologies and always eager to learn new frameworks.',
    techStack: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Python'],
    location: 'San Francisco, CA',
    githubUrl: 'https://github.com/alexdev',
    linkedinUrl: 'https://linkedin.com/in/alexdev'
  })

  const [newTech, setNewTech] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const addTech = () => {
    if (newTech.trim() && !user.techStack?.includes(newTech.trim())) {
      setUser(prev => ({
        ...prev,
        techStack: [...(prev.techStack || []), newTech.trim()]
      }))
      setNewTech('')
    }
  }

  const removeTech = (techToRemove: string) => {
    setUser(prev => ({
      ...prev,
      techStack: prev.techStack?.filter(tech => tech !== techToRemove) || []
    }))
  }

  const handleSave = () => {
    // TODO: API call to save user profile
    setIsEditing(false)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="h-32 bg-gradient-to-br from-primary-400 to-primary-600 relative">
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-4xl font-bold text-primary-600">
                {user.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-20 p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={user.name || ''}
                  onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
                  className="text-3xl font-bold text-gray-900 border-b-2 border-primary-200 focus:border-primary-500 outline-none bg-transparent"
                />
              ) : (
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              )}
              
              {user.location && (
                <div className="flex items-center text-gray-600 mt-2">
                  <MapPin size={16} className="mr-1" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={user.location}
                      onChange={(e) => setUser(prev => ({ ...prev, location: e.target.value }))}
                      className="border-b border-gray-300 focus:border-primary-500 outline-none bg-transparent"
                    />
                  ) : (
                    <span>{user.location}</span>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              {isEditing ? 'Save' : 'Edit Profile'}
            </button>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4 mb-6">
            {user.githubUrl && (
              <a href={user.githubUrl} target="_blank" rel="noopener noreferrer" 
                 className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Github size={20} />
                <span>GitHub</span>
              </a>
            )}
            {user.linkedinUrl && (
              <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer"
                 className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
            )}
          </div>

          {/* Bio */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
            {isEditing ? (
              <textarea
                value={user.bio || ''}
                onChange={(e) => setUser(prev => ({ ...prev, bio: e.target.value }))}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-primary-500 outline-none resize-none"
                placeholder="Tell others about yourself and what you're looking for..."
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{user.bio}</p>
            )}
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {user.techStack?.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                >
                  <span>{tech}</span>
                  {isEditing && (
                    <button
                      onClick={() => removeTech(tech)}
                      className="ml-2 text-primary-500 hover:text-primary-700"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTech()}
                  placeholder="Add a technology..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 outline-none"
                />
                <button
                  onClick={addTech}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center"
                >
                  <Plus size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}