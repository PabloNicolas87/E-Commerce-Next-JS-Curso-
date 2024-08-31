import React from 'react'
import NavigationMenu from '../components/NavigationMenu'

const Layout = ({children}) => {
  return (
    <div>
        <NavigationMenu ulClassName="flex space-x-4 justify-center" />
        <main>{children}</main>
    </div>
  )
}

export default Layout
