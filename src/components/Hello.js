import React from "react";
// import data from "../data";

//jsx
const Hello = () =>{
    // return (
    //     <main className='container'>
    //   <ul className='comments-container'>
    //     {
    //       data.map((eachComment) => {
    //         const { id, email, name, body} = eachComment;
    //         return <li className='comment'>
    //           <div className='comment-header'>
    //               <h3 className='email'>{email}</h3>
    //               <h3 className='name'>{name}</h3>
    //           </div>
    //           <div className='message'>
    //             {body}
    //           </div>
    //         </li>
    //       })
    //     }
        
        
    //   </ul>
    // </main>
    // )

    function clickHandle(firstName, e){
      console.log("Hey Lohith" ,firstName, e )
    }
    return(
      <main className="container">
        <button className="button" onClick={function(e){
          return clickHandle("kandikattu" , e)
        }}> Click Me</button>
      </main>
    )





}

// const Hello = () =>{
//     return (
//     React.createElement('h1', {className:"heading"}, "Hello World!!!")
//     );
// }

// const Hello = () => {
//     return React.createElement(
//         "div",
//         {className:"container"},
//         React.createElement('h1', {className:'heading'},
//         "Hello World")
//     )
// }

export default Hello;