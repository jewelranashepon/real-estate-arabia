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








// "use client"

// import { useState } from "react"
// import { signIn } from "next-auth/react"
// import { useRouter, useSearchParams } from "next/navigation"
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Button,
//   Input,
//   Divider,
// } from "@nextui-org/react"
// import { FaGithub, FaGoogle } from "react-icons/fa"

// export default function SignIn() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const callbackUrl = searchParams.get("callbackUrl") || "/"

//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     const res = await signIn("credentials", {
//       redirect: false,
//       email,
//       password,
//       callbackUrl,
//     })

//     if (res?.error) {
//       setError("Invalid email or password.")
//     } else {
//       router.push(callbackUrl)
//     }
//   }

//   return (
//     <div className="flex justify-center items-center min-h-[80vh]">
//       <Card className="w-full max-w-md">
//         <CardHeader className="flex flex-col items-center pb-0">
//           <h1 className="text-2xl font-bold text-primary-500">Welcome to Birds of Eden</h1>
//           <p className="text-gray-500">Sign in to continue</p>
//         </CardHeader>

//         <CardBody className="flex flex-col gap-4 py-6">
//           {/* OAuth Buttons */}
//           <Button
//             startContent={<FaGithub />}
//             className="w-full"
//             color="default"
//             variant="bordered"
//             onClick={() => signIn("github", { callbackUrl })}
//           >
//             Continue with GitHub
//           </Button>
//           <Button
//             startContent={<FaGoogle />}
//             className="w-full"
//             color="default"
//             variant="bordered"
//             onClick={() => signIn("google", { callbackUrl })}
//           >
//             Continue with Google
//           </Button>

//           <Divider className="my-4" />

//           {/* Credentials Form */}
//           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//             <Input
//               label="Email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               isRequired
//             />
//             <Input
//               label="Password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               isRequired
//             />
//             {error && <p className="text-sm text-red-500">{error}</p>}
//             <Button type="submit" color="primary" fullWidth>
//               Sign in with Email
//             </Button>
//           </form>
//         </CardBody>

//         <CardFooter className="flex flex-col items-center gap-2">
//           <p className="text-sm text-gray-500 text-center">
//             By signing in, you agree to our Terms of Service and Privacy Policy
//           </p>
//           <p className="text-sm">
//             Don’t have an account?{" "}
//             <span
//               className="text-blue-600 underline cursor-pointer"
//               onClick={() => router.push("/auth/signup")}
//             >
//               Sign Up
//             </span>
//           </p>
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
  Button,
  Checkbox,
  Divider,
  Input,
} from "@nextui-org/react"
import { FaFacebook, FaGoogle } from "react-icons/fa"
import { Eye, EyeOff } from "lucide-react"

export default function SignIn() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white to-slate-100 px-4">
      <Card className="w-full max-w-sm p-6 shadow-xl rounded-2xl bg-white">
        <h2 className="text-2xl font-semibold text-black mb-1">Sign In</h2>
        <p className="text-sm text-gray-500 mb-6">Welcome back you’ve been missed</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email ID
            </label>
            <Input
              id="email"
              placeholder="Enter Email ID"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="bordered"
              radius="md"
              isRequired
              classNames={{
                inputWrapper: "h-11",
              }}
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              placeholder="Enter Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="bordered"
              radius="md"
              isRequired
              classNames={{
                inputWrapper: "h-11",
              }}
              endContent={
                <button
                  type="button"
                  className="focus:outline-none"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
          </div>

          {/* Checkbox + Forgot Password */}
          <div className="flex items-center justify-between">
            <Checkbox
              color="secondary"
              isSelected={rememberMe}
              onValueChange={setRememberMe}
              size="sm"
            >
              Remember Me
            </Checkbox>
            <span className="text-sm text-gray-600 cursor-pointer hover:underline">
              Forgot Password?
            </span>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            type="submit"
            color="default"
            className="bg-black text-white font-semibold"
            radius="md"
            fullWidth
          >
            Sign In
          </Button>
        </form>

        {/* Social Divider */}
        <div className="my-6 flex items-center gap-4">
          <Divider className="flex-1" />
          <span className="text-sm text-gray-400">Or with</span>
          <Divider className="flex-1" />
        </div>

        {/* Social Buttons */}
        <div className="flex gap-3 justify-center">
          <Button
            variant="bordered"
            radius="md"
            startContent={<FaFacebook className="text-blue-600" />}
          >
            Facebook
          </Button>
          <Button
            variant="bordered"
            radius="md"
            startContent={<FaGoogle className="text-red-500" />}
          >
            Google
          </Button>
        </div>
      </Card>
    </div>
  )
}
