import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import { User } from '../../../shared/types'
import { Github, Linkedin, MapPin, X, Heart } from 'lucide-react'

interface SwipeCardProps {
  user: User
  onSwipe: (direction: 'left' | 'right') => void
}

export default function SwipeCard({ user, onSwipe }: SwipeCardProps) {
  const [{ x, y, rotate }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotate: 0,
  }))

  const bind = useDrag(({ down, movement: [mx, my], velocity, direction: [xDir] }) => {
    const trigger = Math.abs(mx) > 100
    const dir = xDir < 0 ? -1 : 1
    
    if (!down && trigger) {
      onSwipe(dir === 1 ? 'right' : 'left')
    }
    
    api.start({
      x: down ? mx : trigger ? 200 * dir : 0,
      y: down ? my : 0,
      rotate: down ? mx / 10 : 0,
      config: { tension: 200, friction: 50 }
    })
  })

  return (
    <animated.div
      {...bind()}
      className="swipe-card absolute w-full max-w-sm mx-auto bg-white rounded-2xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing"
      style={{
        x,
        y,
        rotate: rotate.to(r => `${r}deg`),
        touchAction: 'none'
      }}
    >
      <div className="relative">
        <div className="h-64 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
          <div className="text-6xl text-white font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
        
        {/* Swipe indicators */}
        <animated.div
          className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg"
          style={{
            opacity: x.to(x => x < -50 ? Math.min(1, Math.abs(x) / 100) : 0)
          }}
        >
          PASS
        </animated.div>
        
        <animated.div
          className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-lg"
          style={{
            opacity: x.to(x => x > 50 ? Math.min(1, x / 100) : 0)
          }}
        >
          LIKE
        </animated.div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
            {user.location && (
              <div className="flex items-center text-gray-600 mt-1">
                <MapPin size={16} className="mr-1" />
                <span>{user.location}</span>
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            {user.githubUrl && (
              <a href={user.githubUrl} target="_blank" rel="noopener noreferrer" 
                 className="text-gray-600 hover:text-gray-900">
                <Github size={20} />
              </a>
            )}
            {user.linkedinUrl && (
              <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer"
                 className="text-gray-600 hover:text-blue-600">
                <Linkedin size={20} />
              </a>
            )}
          </div>
        </div>

        <p className="text-gray-700 mb-4">{user.bio}</p>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {user.techStack.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => onSwipe('left')}
            className="flex items-center justify-center w-14 h-14 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          <button
            onClick={() => onSwipe('right')}
            className="flex items-center justify-center w-14 h-14 bg-green-100 hover:bg-green-200 text-green-600 rounded-full transition-colors"
          >
            <Heart size={24} />
          </button>
        </div>
      </div>
    </animated.div>
  )
}