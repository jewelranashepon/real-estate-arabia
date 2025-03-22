"use client"

import { signIn, useSession } from "next-auth/react"
import { Button } from "@nextui-org/react"
import UserProfilePanel from "./UserProfilePanel"
import { useRouter } from "next/navigation"


const SignInPanel = () => {
  const { data: session, status } = useSession()

  console.log("Seggion Data:", session);
  const router = useRouter()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (session) {
    return <UserProfilePanel user={session.user} />
  }

  return (
    <div className="flex gap-3">
      <Button color="primary" onClick={() => router.push("/auth/signin")}>
        Sign In
      </Button>
      <Button onClick={() => router.push("/auth/signup")}>Sign Up</Button>
    </div>
  )
}

export default SignInPanel

