import React , {useEffect , useState} from "react";

const Final = () =>{
    const [count , setCount] = useState(0);
    const [pagewidth , setPagewidth] = useState(window.innerWidth);

    useEffect(() =>{

        const resizeHandler = () =>{
            setPagewidth(window.innerWidth)
        };
        window.addEventListener("resize", resizeHandler)
        console.log("Hello useState" , count);
        return () =>{
            console.log("I am Removed");
            window.removeEventListener("resize", resizeHandler)
        }
    });

    return(
        <div>
            <h1>I'm useEffect</h1>
            <h1 >{pagewidth}</h1>
            <h1>{count}</h1>
            <button onClick={() => {setCount(count + 1)}}>Incr</button>
        </div>
    )
}

export default Final;