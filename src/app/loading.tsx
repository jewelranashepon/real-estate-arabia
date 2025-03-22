"use client"

import { Spinner } from "@nextui-org/react"


export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        <Spinner color="primary" size="lg" />
        <p className="text-sm text-gray-500">Loading, please wait...</p>
      </div>
    </div>
  )
}