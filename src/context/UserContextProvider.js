import React, { Children } from "react";
import UserContext from "./UserContextProvider";

const UserContextProvider = ({Children}) =>{
    const [user,setUser] = React.useState({})
    return(
    <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>

    )
}

export default UserContextProvider;    //The Component will be wrapped around it that need to use UserContext