"use client"
import { Navbar, NavbarContent, NavbarMenuToggle, NavbarBrand, NavbarMenu } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import React, { type ReactNode } from "react"

interface Props {
  children: ReactNode
}

const Appbar = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  return (
    <Navbar className="shadow-md" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
        <NavbarBrand>
          <Link href={"/"} className="flex items-center text-primary-400 hover:text-primary-600 transition-colors">
            {/* Logo Image from Public Folder */}
            <Image
              src="/images/birds_ofeden.jpeg" // Path to your logo in public/images/
              alt="SK Real Estate Logo"
              width={40} // Set appropriate width
              height={40} // Set appropriate height
              className="w-auto h-auto" // Tailwind classes for responsiveness
            />
            <p className="font-bold text-xl text-inherit ml-4">Birds of Eden </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex font-bold text-xl text-primary-500 gap-4" justify="center">
        Admin Panel
      </NavbarContent>
      <NavbarContent justify="end" className="flex gap-5">
        <Link href="/user/properties" className="text-xl font-semibold text-primary-500">
          Properties
        </Link>
        {children}
      </NavbarContent>
      <NavbarMenu></NavbarMenu>
    </Navbar>
  )
}

export default Appbar

