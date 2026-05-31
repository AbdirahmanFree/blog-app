import React, {useContext, useEffect} from "react";
import {UserContext} from "@/context/UserContext";
import { UseUserAuth } from "@/hooks/useUserAuth";

function Home(){
    UseUserAuth()

    return(
    <>
    hello
    </>
    )
}

export default Home