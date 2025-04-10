import { useSignIn } from "@clerk/clerk-react"
import { Button } from "../ui/button"

const SignInOAuthButtons = () => {
    const { signIn, isLoaded } = useSignIn()

    if (!isLoaded) return null

    const signInWithGoogle = () => {
        signIn.authenticateWithRedirect({
            strategy: "oauth_google",
            redirectUrl: "/sso-callback", // This will get the authentication from Google
            redirectUrlComplete: "/auth-callback", // This will complete the authentication process
        })
    }

  return (
    <Button variant={"secondary"} className="w-full text-white border-zinc-200 h-11" onClick={signInWithGoogle}>
        Sing in
    </Button>
  )
}

export default SignInOAuthButtons