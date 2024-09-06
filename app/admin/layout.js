import React from 'react'

const AdminLayout = ({children, login}) => {
    const logged = true;
    return (
        <div>
            {logged ? children : login}    
        </div>
        
    )
}

export default AdminLayout