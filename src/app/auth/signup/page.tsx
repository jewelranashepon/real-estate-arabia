// 'use client'

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Input, Button } from "@nextui-org/react"

// const SignUpPage = () => {
//   const router = useRouter()
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   })
//   const [error, setError] = useState("")

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     const res = await fetch("/api/auth/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     })

//     if (res.ok) {
//       router.push("/auth/signin")
//     } else {
//       const data = await res.json()
//       setError(data.message || "Something went wrong")
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto p-6">
//       <h2 className="text-xl font-bold mb-4">Create an Account</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <Input
//           label="First Name"
//           name="firstName"
//           value={form.firstName}
//           onChange={handleChange}
//           isRequired
//         />
//         <Input
//           label="Last Name"
//           name="lastName"
//           value={form.lastName}
//           onChange={handleChange}
//           isRequired
//         />
//         <Input
//           label="Email"
//           name="email"
//           type="email"
//           value={form.email}
//           onChange={handleChange}
//           isRequired
//         />
//         <Input
//           label="Password"
//           name="password"
//           type="password"
//           value={form.password}
//           onChange={handleChange}
//           isRequired
//         />
//         {error && <p className="text-sm text-red-500">{error}</p>}
//         <Button type="submit" color="primary" fullWidth>
//           Sign Up
//         </Button>
//       </form>
//     </div>
//   )
// }

// export default SignUpPage


















"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Divider,
} from "@nextui-org/react"

const SignUpPage = () => {
  const router = useRouter()
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      router.push("/auth/signin")
    } else {
      const data = await res.json()
      setError(data.message || "Something went wrong")
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <Card className="w-full max-w-md p-6 shadow-xl rounded-2xl">
        <CardHeader className="flex flex-col items-center pb-0 gap-2">
          <h1 className="text-3xl font-bold text-center text-primary">
            Create Your Account
          </h1>
          <p className="text-gray-500 text-sm text-center">
            Sign up to access exclusive features
          </p>
        </CardHeader>

        <Divider className="my-4" />

        <CardBody className="flex flex-col gap-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="First Name"
              name="firstName"
              variant="bordered"
              value={form.firstName}
              onChange={handleChange}
              isRequired
            />
            <Input
              label="Last Name"
              name="lastName"
              variant="bordered"
              value={form.lastName}
              onChange={handleChange}
              isRequired
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              variant="bordered"
              value={form.email}
              onChange={handleChange}
              isRequired
            />
            <Input
              label="Password"
              name="password"
              type="password"
              variant="bordered"
              value={form.password}
              onChange={handleChange}
              isRequired
            />
            {error && (
              <p className="text-sm text-center text-red-500">{error}</p>
            )}
            <Button type="submit" color="primary" fullWidth radius="full" size="lg">
              Sign Up
            </Button>
          </form>
        </CardBody>

        <Divider className="my-4" />

        <CardFooter className="flex flex-col gap-2 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/auth/signin")}
              className="text-blue-600 font-medium cursor-pointer underline hover:opacity-80"
            >
              Sign In
            </span>
          </p>
          <p className="text-xs text-gray-400">
            By signing up, you agree to our Terms & Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignUpPage
