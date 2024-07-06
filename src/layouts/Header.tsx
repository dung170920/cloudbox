"use client"
import Searchbar from '@/components/Searchbar'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import React, { Dispatch, SetStateAction, useState } from 'react'

export const Header = () => {

  return (
    <header className='border-b'>
      <div className="container flex justify-between items-center h-20">
        <Searchbar query={'query'} setQuery={() => { }} />
        <div className="flex gap-6">
          <OrganizationSwitcher />
          <UserButton appearance={{ elements: { userButtonAvatarBox: 'w-8 h-8', userButtonBox: 'flex-row-reverse' } }} showName />
        </div>
      </div>
    </header>
  )
}
