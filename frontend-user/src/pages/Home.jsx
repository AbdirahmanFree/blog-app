import NavBar from "@/components/NavBar";
import { UseUserAuth } from "@/hooks/useUserAuth";

function Home(){
    UseUserAuth()

    return(
    <>
        <NavBar/>
        <h1>Home</h1>
    </>
    )
}

export default Home