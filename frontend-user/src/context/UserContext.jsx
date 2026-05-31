import { createContext, useState, useEffect } from "react"

export const UserContext = createContext()

function UserProvider({ children }){
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    function updateUser(userData){
        setUser(userData)
    }

    function clearUser(){
        setUser(null)
    }

    return (
        <UserContext.Provider
        value={{
            user,
            updateUser,
            clearUser,
            setLoading,
            loading

        }}
        >
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider