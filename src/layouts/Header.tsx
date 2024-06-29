import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Header = () => {
  return (
    <header className='border-b'>
      <div className="container flex justify-between items-center h-20">
        <Link href={"/"} className='flex gap-2 items-center'>
          <Image src={"/icons/logo.svg"} alt="logo" width={30} height={30} />
          <span className='font-bold text-xl'>CloudBox.</span>
        </Link>
        <div className="flex gap-6">
          <OrganizationSwitcher />
          <UserButton appearance={{ elements: { userButtonAvatarBox: 'w-8 h-8', userButtonBox: 'flex-row-reverse' } }} showName />
        </div>

      </div>
    </header>
  )
}
