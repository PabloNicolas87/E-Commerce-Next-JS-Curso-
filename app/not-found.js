'use client'
import React from 'react'
import Button from './components/Button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="flex-grow flex flex-col justify-around items-center py-4">
        <Image src='/error.png' alt='logo' height={100} width={300} />
        <Button onClick={() => router.back()} className='p-3'>Volver a la página anterior</Button>
    </div>
  )
}

export default NotFound