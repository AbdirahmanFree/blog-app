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

    useEffect(() => {
        console.log("USER CONTEXT CHANGED:", user);
    }, [user]);

    useEffect(() => {
        console.log("LOADING CHANGED:", loading);
    }, [loading]);

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