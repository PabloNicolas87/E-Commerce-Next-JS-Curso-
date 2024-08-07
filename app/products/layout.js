import React from 'react'
import NavigationMenu from '../components/NavigationMenu'

const layout = ({children}) => {
  return (
    <div>
        <NavigationMenu></NavigationMenu>
        <main>{children}</main>    
    </div>
  )
}

export default layout