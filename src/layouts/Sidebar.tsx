"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { sideLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className='border-r w-[250px] py-5 flex flex-col h-full gap-10'>
      <div className="flex flex-col gap-10 flex-1">
        <Link href={"/"} className='flex gap-2 items-center px-5'>
          <Image src={"/icons/logo.svg"} alt="logo" width={36} height={36} />
          <span className='font-bold text-xl'>CloudBox.</span>
        </Link>
        {/* Links */}
        <div className="flex flex-col gap-3">
          {sideLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={cn("flex gap-3 items-center h-10 relative before:absolute before:left-0 before:w-1 before:h-6 before:rounded-tr-sm before:rounded-br-sm before:bg-transparent", {
                "before:bg-primary": pathname.startsWith(link.path),
              })}
            >
              <link.icon className={`h-6 w-6 flex-shrink-0 ml-6`} />
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
      { }
      <span>Upgrade now</span>
    </div>
  )
}
