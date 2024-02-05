import React,{useState}from 'react'
import "./Todo.css";
const Todo = () => {
    
   const[list,setList]=useState([]);
   const[message,setMessage]=useState({
    text:"",
    id:""
   });
   const [editingItem,setEditingItem]=useState({
    id:"",
    isEditing:false
   })

   const changeMessage=(e)=>{
    setMessage({ 
  ...message,
    text:e.target.value,
    
   });
}
   const handleSubmit=(e)=>{
    e.preventDefault();
    let newTodo={
        text:message.text,
        id: new Date().getTime().toString()

    }
    setList([...list,newTodo])
    setMessage({
        text:"",
        id:""
    })
   }
   const handleDelete =(id) =>{
     let newTodos= list.filter((eachItem)=>{
        return eachItem.id !== id
     })
     setList(newTodos)
   }
   const changeEditState=(id)=>{
    console.log(id)
    setEditingItem({
        ...editingItem,
        id:id,
        isEditing:true
    })
    let editableItem= list.find((eachItem)=>
        eachItem.id === id 
    )
   setMessage(editableItem)
   }
   const handleEdit =(e)=>{
     e.preventDefault()
     let newTodos=list.map((eachItem)=>{
       if (eachItem.id === editingItem.id){
    return {
    text:message.text,
    id:editingItem.id
   }
       }else{
        return eachItem.id
       }
     })
     setList(newTodos)
     setMessage({
        text:"",
        id:""

     })
     setEditingItem({
        id:"",
        isEditing:false
     })
   }
   
  return (
    <div className='container'>
        <h1 className='Todos-Heading'>Todos Application</h1>
        <h1 className="create-task-heading"><b>Create </b>Task</h1>
        <input className="input-value"type='text' id="textInput"placeholder='What needs to be done?'
       value={message.text}
        onChange={changeMessage} required
        />
        {
            editingItem.isEditing ? <button className='add-button' onClick={handleEdit}>edit</button> :
                <button className='add-button' onClick={handleSubmit}>Add</button> 
            
            }
       
       <hr/>
       {list.length === 0 && <h4>There is no items to be add</h4>}
      {list.length > 0 &&
        <h1 className="create-task-heading"><b>My </b>Tasks</h1>
}
        <div>
         
            <ul>
                {
            list.map((eachItem)=>{
                const{id,text}=eachItem;
                return (
                   <li key={id}>
                     <button className='Edit-Button' onClick={()=>changeEditState(id)}>Edit</button>
                    <input id="checkbox"className='checkbox' type='checkbox'/>
                    <label htmlFor="checkbox" id="labelText"className='label-style '>{text}</label>
                     <button className='delete-button'onClick={()=>handleDelete(id)} >Delete</button>
                  
                   </li>
                )
            })}
            
            </ul>
        </div>
        { list.length > 0 &&
        <button className='save-button'>Saved</button>
}

      
    </div>
  )
}

export default Todo;
