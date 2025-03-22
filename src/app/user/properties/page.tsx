import prisma from "@/lib/prisma"
import PropertiesTable from "./_components/PropertiesTable"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const PAGE_SIZE = 12

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

const PropertiesPage = async ({ searchParams }: Props) => {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id

  const pagenum = searchParams.pagenum ?? 0
  const propertiesPromise = prisma.property.findMany({
    where: {
      userId: userId,
    },
    include: {
      type: true,
      status: true,
    },
    skip: +pagenum * PAGE_SIZE,
    take: PAGE_SIZE,
  })

  const totalPropertiesPromise = prisma.property.count({
    where: {
      userId: userId,
    },
  })

  const [properties, totalProperties] = await Promise.all([propertiesPromise, totalPropertiesPromise])

  const totalPages = Math.floor(totalProperties / PAGE_SIZE)

  return <PropertiesTable properties={properties} totalPages={totalPages} currentPage={+pagenum} />
}

export default PropertiesPage

