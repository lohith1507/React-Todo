import React, { useState } from "react";

//By using Objects;
// const Index = () =>{


//     const someObj = {
//         firstName : "Lohith",
//         lastName : "Nani",
//         age : 23
//     }

//     const changelastName = () =>{
//         setData({...data , lastName : "Kandikattu"})
//     };

//     const changefirstName = () =>{
//         setData({...data , firstName : "Nani"})
//     };

//     const [data , setData] = useState(someObj);

//     return (
//         <div className="container">
//             <h1>My firstname is {data.firstName}</h1>
//             <button onClick={changefirstName}>Click Me</button>
//             <h1>My firstname is {data.lastName}</h1>
//             <button onClick={changelastName}>Click Me</button>
//             <h1>My firstname is {data.age}</h1>

//         </div>
//     )
// };


//By using Arrays

const Index = () => {
    const initialArray = [
        {   
            id: "qwerty",
            firstName: "emma",
            lastName: "watson",
            age : 24
        },
        {
            id: "poiuy",
            firstName: "Lohith",
            lastName: "Kandikattu",
            age: 23
        },
        {
            id: "pius",
            firstName: "Tom",
            lastName: "Hanks",
            age: 27
        },
    ];
    const [data , setData] = useState(initialArray);
    console.log(data);

    const handleDelete = (comingId) => {
        const filterData = data.filter((eachItem ) =>{
            return eachItem.id !== comingId;
        })

        setData(filterData);
    };

    return(
        <div>
            <ul>
                {data.map((eachItem , index) => {
                        const {firstName , lastName , age , id} = eachItem;
                        return(
                            <li key={index}>
                                <div>
                                    My firstName <strong>{firstName}</strong>
                                </div>
                                <div>
                                    My lastName <strong>{lastName}</strong>
                                </div>
                                <div>
                                    My age is <strong>{age}</strong>
                                </div>
                                <button onClick={() => handleDelete(id)}>Delete Me</button>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    )
}


export default Index;