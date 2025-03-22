// "use client"
// import { signOut } from "next-auth/react"
// import { Dropdown, DropdownTrigger, User, DropdownMenu, DropdownItem } from "@nextui-org/react"
// import Link from "next/link"

// interface Props {
//   user: any
// }

// const UserProfilePanel = ({ user }: Props) => {
//   return (
//     <Dropdown placement="bottom-start">
//       <DropdownTrigger>
//         <User
//           as="button"
//           avatarProps={{
//             isBordered: true,
//             src: user.avatarUrl  ?? "/profile.png",
//           }}
//           className="transition-transform"
//           name={""}
//         />
//       </DropdownTrigger>
//       <DropdownMenu aria-label="User Actions" variant="flat">
//         <DropdownItem>
//           <Link href="/user/profile">Profile</Link>
//         </DropdownItem>
//         <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
//           Log Out
//         </DropdownItem>
//       </DropdownMenu>
//     </Dropdown>
//   )
// }

// export default UserProfilePanel



"use client"

import { signOut } from "next-auth/react"
import {
  Dropdown,
  DropdownTrigger,
  User,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react"
import Link from "next/link"

interface Props {
  user: {
    id: string
    email: string
    firstName?: string
    lastName?: string
    avatarUrl?: string
  }
}

const UserProfilePanel = ({ user }: Props) => {
  const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          className="transition-transform"
          name={fullName || user.email}
          description={user.email}
          avatarProps={{
            isBordered: true,
            showFallback: true,
            src: user.avatarUrl ?? "/profile.png",
            fallback: fullName ? fullName[0] : "U",
          }}
        />
      </DropdownTrigger>

      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="profile">
          <Link href="/user/profile">Profile</Link>
        </DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default UserProfilePanel
