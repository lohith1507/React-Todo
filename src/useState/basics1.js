import React, { useState } from "react";

const Basics1 = () =>{
    const [count , setCount] = useState(0);

    function incr(){
        setCount(count + 2);
    };

    function decr(){
        setCount(count - 1);
    }

    return (
        <div>
            <button onClick={decr}>-</button> &nbsp;
            <span>Count : {count}</span>&nbsp;
            <button onClick={incr}>+</button>
        </div>
    )
}




export default Basics1;