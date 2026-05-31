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