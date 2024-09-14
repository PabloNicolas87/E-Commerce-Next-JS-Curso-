'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import Button from '../components/Button';
import Image from 'next/image'

const Error = () => {

    const router = useRouter();
;  return (
    <div className="flex-grow flex flex-col justify-around items-center py-4">
        <Image src='/error500.png' alt='logo' height={100} width={300} />
        <Button onClick={() => router.back()} className='p-3'>Volver a la página anterior</Button>
    </div>
    
  )
}

export default Error


