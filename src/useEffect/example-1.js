import React , {useEffect ,useState} from "react";

const Final = () =>{

    const [count , setCount] = useState(0);

    useEffect(() => {
        console.log("hello mister useState" , count);
    }, []);
    

    return(
        <div>
            <h1>I'm on useEffect</h1>
        <h1>{count}</h1>
        <button onClick={() =>{setCount(count + 1)}}>Incr</button>
        </div>
    )
};




export default Final;