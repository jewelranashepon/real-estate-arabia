import SubmitButton from "@/app/components/SubmitButton"
import { deleteProperty } from "@/lib/actions/property"
import prisma from "@/lib/prisma"
import { Button } from "@nextui-org/react"
import { getServerSession } from "next-auth/next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

interface Props {
  params: { id: string }
}

async function DeletePropertyPage({ params }: Props) {
  const session = await getServerSession(authOptions)
  const propertyPromise = prisma.property.findUnique({
    where: {
      id: +params.id,
    },
  })
  const [property] = await Promise.all([propertyPromise])

  if (!property) return notFound()
  if (!session?.user?.id || property.userId !== session.user.id) redirect("/unauthorized")

  const deleteAction = async () => {
    "use server"
    try {
      await deleteProperty(+params.id)
      redirect("/user/properties")
    } catch (e) {
      throw e
    }
  }

  return (
    <form action={deleteAction} className="mt-9 flex f flex-col items-center justify-center gap-3">
      <p>Are you sure to delete this property?</p>
      <p>
        <span className="text-slate-400">Name: </span> <span className="text-slate-700">{property.name}</span>
      </p>
      <div className="flex justify-center gap-3">
        <Link href={"/user/properties"}>
          <Button>Cancel</Button>
        </Link>
        <SubmitButton type="submit" color="danger" variant="light">
          Delete
        </SubmitButton>
      </div>
    </form>
  )
}

export default DeletePropertyPage

