import React ,{useState} from "react";

const Index = () =>{

    const [list , setList] = useState([]) 
    const [message , setMessage] = useState({
        text : "",
        id : ""
    });
    const [editItem , setEditItem] = useState({
        id : "",
        isEditing : false
    })

    const changeMessage = (e) => {
        setMessage({
            ...message, 
            text : e.target.value
        });
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        let newTodo = {
            text : message.text,
            id:new Date().getTime().toString()
        }
        setList([...list , newTodo]);
        setMessage({
            text:"",
            id:""
        })
    }

    const handleDelete = (id) =>{
        let newTodo = list.filter((eachItem) =>{
            return eachItem.id !== id;
        });
        setList(newTodo); 
    };
    const changeEditState = (id) =>{
        console.log (id);
        setEditItem({
            ...editItem,
            id : id,
            isEditing :true,
        });
        let editableItem = list.find((eachItem) => 
        eachItem.id === id);
        setMessage({
            ...message, 
            text : editableItem.text,
            id : editableItem.id
        })
        console.log(editableItem);
    }    

    const handleEdit = (e) => {
        e.preventDefault();
        let newTodos = list.map((eachItem) =>{
            if (eachItem.id === editItem.id){
                return {
                    text : message.text,
                    id: editItem.id
                }
            }else{
                return eachItem;
            }
        });
        setList(newTodos);
        setMessage({
            text:"",
            id:""
        });
        setEditItem({
            id : "",
            isEditing : false
        });
    }
    
    return (
        <div>
            <form>
                <input type="text" 
                name="message" 
                id="meassge"
                placeholder="enter some text..."
                value={message.text}
                onChange={changeMessage}
                />
                {editItem.isEditing ? (
                    <button onClick={handleEdit} type="submit">Edit</button>
                ):(
                    <button onClick={handleSubmit} type="submit">Add</button>
                )}
                
            </form> 
            <hr/>
            {
                list.length === 0 && <h3>There are no items in the list</h3>
            }
            <ul>
                {list.map((eachItem) => {
                    const {text , id} = eachItem;
                    return (
                        <li key={id}>
                            <span>{text}</span>
                            <button onClick={() => changeEditState(id)}>Edit</button> 
                            <button onClick={() => handleDelete(id)}>Delete</button>

                        </li>
                    )
                })
            }
            
            </ul>
        </div>
    )
}
export default Index;