import { Card, CardContent } from "@/components/ui/card"
import { axiosInstance } from "@/lib/axios"
import { useUser } from "@clerk/clerk-react"
import { Loader2 } from "lucide-react"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

const AuthCallbackPage = () => {
    const navigate = useNavigate()
    const { isLoaded, user } = useUser()
    const syncAttempted = useRef(false) // to prevent multiple sync attempts if the user is not loaded or the sync has already been attempted 

    useEffect(() => {
        const syncUser = async () => {
            if (!user || !isLoaded || syncAttempted.current) return;
            
            try {
                syncAttempted.current = true

                await axiosInstance.post("/auth/callback", {
                    id:user.id,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    imageUrl:user.imageUrl
                })
            } catch (error) {
                console.error("Error syncing user", error)
            } finally {
                navigate("/")
            }
        }
        syncUser()
    }, [isLoaded, user, navigate])  

  return (
    <div className="flex bg-black w-full items-center justify-center h-screen">
        <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
            <CardContent className="flex flex-col gap-4 items-center pt-6">
                <Loader2 className="size-10 animate-spin text-emerald-500" />
                <h3 className="text-zinc-400 text-xl font-bold">
                    Logging you in...
                </h3>
                <p className="text-zinc-400 text-sm">
                    Redirecting...
                </p>
            </CardContent>
        </Card>
    </div>
  )
}

export default AuthCallbackPage