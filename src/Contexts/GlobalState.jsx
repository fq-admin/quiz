import {useState} from "react";
import GlobalContext from "./GlobalContext";
// import axios from "axios";

// const BASE_URL = "https://localhost:3000/";

const GlobalState = (props) => {
    const [sid,setSid] = useState(-1)

    // const getGlobal = async () => {
    //     const res=await axios.get(`${BASE_URL}Global`)
    //     setGlobal(res.data)
    //     console.log(res.data)
    // }
    
    return (
        <GlobalContext.Provider value={{sid,setSid}}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export default GlobalState;