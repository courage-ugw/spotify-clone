import { SignedOut, UserButton } from "@clerk/clerk-react"
import { LayoutDashboard } from "lucide-react"
import { Link } from "react-router-dom"
import SignInOAuthButtons from "./SignInOAuthButtons"
import { useAuthStore } from "@/stores/useAuthStore"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"
import useIsMobile from "@/stores/useIsMobile"

const Topbar = () => {
    const { isAdmin } = useAuthStore()
    const isMobile = useIsMobile()

  return (
    <div className="flex justify-between items-center p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      <div className="flex items-center gap-2">
        <Link to='/' className='rounded-lg'>
            <img src='/logo.png' className='size-8 text-black' />
        </Link>
        <Link to='/' className='rounded-lg'>
          HomeFinder
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to="/admin" className={cn(buttonVariants({ variant: "outline" }))}>
            <LayoutDashboard className={ isMobile ? "size-4 ml-1" : "size-4 mr-2" } />
            {isMobile ? "" : "Admin Dashboard"}
          </Link>
        )}

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  )
}

export default Topbar