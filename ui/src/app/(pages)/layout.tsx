'use client'
import appwriteService from '@/authentication/appwrite/config'
import { AuthProvider } from '@/context/authContext'
import React, { useEffect, useState } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

const InternalLayout = ({ children }: { children: React.ReactNode }) => {
  const [authorised, setAuthorised] = useState(false)
  const [statusLoaded, setStatusLoaded] = useState(false)

  useEffect(() => {
    appwriteService.isLoggedIn().then((isLoggedIn) => {
      setAuthorised(isLoggedIn)
      setStatusLoaded(true)
    })
  }, [])

  return (
    <AuthProvider
      value={{ authorised, setAuthorised, statusLoaded, setStatusLoaded }}
    >
      <SpeedInsights />
      {children}
      <Analytics />
    </AuthProvider>
  )
}

export default InternalLayout
