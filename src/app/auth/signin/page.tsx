// "use client"

// import { signIn } from "next-auth/react"
// import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react"
// import { FaGithub, FaGoogle } from "react-icons/fa"

// export default function SignIn() {
//   return (
//     <div className="flex justify-center items-center min-h-[80vh]">
//       <Card className="w-full max-w-md">
//         <CardHeader className="flex flex-col items-center pb-0">
//           <h1 className="text-2xl font-bold text-primary-500">Welcome to Birds of Eden</h1>
//           <p className="text-gray-500">Sign in to continue</p>
//         </CardHeader>
//         <CardBody className="flex flex-col gap-4 py-6">
//           <Button
//             startContent={<FaGithub />}
//             className="w-full"
//             color="default"
//             variant="bordered"
//             onClick={() => signIn("github", { callbackUrl: "/" })}
//           >
//             Continue with GitHub
//           </Button>
//           <Button
//             startContent={<FaGoogle />}
//             className="w-full"
//             color="default"
//             variant="bordered"
//             onClick={() => signIn("google", { callbackUrl: "/" })}
//           >
//             Continue with Google
//           </Button>
//         </CardBody>
//         <CardFooter className="flex flex-col items-center">
//           <p className="text-sm text-gray-500">By signing in, you agree to our Terms of Service and Privacy Policy</p>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }








"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
  Divider,
} from "@nextui-org/react"
import { FaGithub, FaGoogle } from "react-icons/fa"

export default function SignIn() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    })

    if (res?.error) {
      setError("Invalid email or password.")
    } else {
      router.push(callbackUrl)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center pb-0">
          <h1 className="text-2xl font-bold text-primary-500">Welcome to Birds of Eden</h1>
          <p className="text-gray-500">Sign in to continue</p>
        </CardHeader>

        <CardBody className="flex flex-col gap-4 py-6">
          {/* OAuth Buttons */}
          <Button
            startContent={<FaGithub />}
            className="w-full"
            color="default"
            variant="bordered"
            onClick={() => signIn("github", { callbackUrl })}
          >
            Continue with GitHub
          </Button>
          <Button
            startContent={<FaGoogle />}
            className="w-full"
            color="default"
            variant="bordered"
            onClick={() => signIn("google", { callbackUrl })}
          >
            Continue with Google
          </Button>

          <Divider className="my-4" />

          {/* Credentials Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isRequired
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isRequired
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" color="primary" fullWidth>
              Sign in with Email
            </Button>
          </form>
        </CardBody>

        <CardFooter className="flex flex-col items-center gap-2">
          <p className="text-sm text-gray-500 text-center">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
          <p className="text-sm">
            Don’t have an account?{" "}
            <span
              className="text-blue-600 underline cursor-pointer"
              onClick={() => router.push("/auth/signup")}
            >
              Sign Up
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
