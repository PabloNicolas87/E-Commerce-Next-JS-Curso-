import React from 'react'

const Button = ({children, className = '', ...args}) => {
  return (
    <button className={`rounded-lg py-2 bg-blue-600 text-white ${className}`} {...args}>
        {children}
    </button>
  )
}

export default Button