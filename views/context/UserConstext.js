import React, {createContext, useState} from "react";

export const UserContext = createContext();

export function UserProvider({children}){
    const [users, setUsers] = useState([{name:'admin', email:'admin@email.com', password:'123456'}]);
    const [isLogged, setIsLogged] = useState(false);

    const registerUser = (name, email, password)=>{
        setUsers(prev => [...prev, {name, email, password}]);
    }

    const loginUser = (email, password)=>{
        const exists = users.find(u => u.email === email && u.password === password);
        if (exists){
            setIsLogged(true);
            return true;
        }
        return false;
    }

    return (
        <UserContext.Provider value={{ users, isLogged, registerUser, loginUser }}>
            {children}
        </UserContext.Provider>
    );

}