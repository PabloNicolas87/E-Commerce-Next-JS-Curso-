'use client'
import React from 'react'
import Button from './components/Button'
import { useRouter } from 'next/navigation'

const NotFound = () => {
  const router = useRouter();
  return (
    <main className="flex-grow p-3">
        <h1>Página no encontrada</h1>
        <Button onClick={() => router.back()} className='p-3'>Volver a la página anterior</Button>
    </main>
  )
}

export default NotFound