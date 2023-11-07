import React , {useEffect , useState} from "react";

const Final = () =>{
    const [count , setCount] = useState(0);
    const [toggle , setToggle] = useState(true);

    useEffect(() =>{
        console.log("Hello useState" , count);
    }, [count , toggle]);

    return(
        <div>
            <h1>I'm useEffect</h1>
            <h1 onClick={() => setToggle(!toggle)}>{toggle ? "open" : "close"}</h1>
            <h1>{count}</h1>
            <button onClick={() => {setCount(count + 1)}}>Incr</button>
        </div>
    )
}

export default Final;