import { useAuth } from '@clerk/clerk-react'
import { useState, useEffect } from 'react'
import { axiosInstance } from '../lib/axios'
import { Loader } from 'lucide-react' 
import { useAuthStore } from '../stores/useAuthStore'
import { useChatStore } from '../stores/useChatStore'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId } = useAuth()
  const [loading, setLoading] = useState(true)
  const { checkAdminStatus } = useAuthStore()
  const { initializeSocket, disconnectSocket } = useChatStore()

  const updateApiToken = async (token: string | null) => {
    if (token) axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    else delete axiosInstance.defaults.headers.common['Authorization']
  }

  useEffect(() => {
    const initAuth = async () => {
        try {
            const token = await getToken()
            updateApiToken(token)
            if (token) {
                await checkAdminStatus()
                // Initialize socket connection
                if (userId) initializeSocket(userId)
            }
        } catch (error) {
            updateApiToken(null)
            console.error("Error fetching token", error)
        } finally {
            setLoading(false)
        }
    }
    initAuth()

    // Cleanup on unmount
    return () => disconnectSocket()
    
  }, [getToken, checkAdminStatus, initializeSocket, disconnectSocket, userId])

  if (loading) return (
    <div className="flex w-full justify-center items-center h-screen">
        <Loader className="size-8 text-emerald-500 animate-spin" />
    </div>
  )

  return (
    <div>
        {children}
    </div>
  )
}

export default AuthProvider