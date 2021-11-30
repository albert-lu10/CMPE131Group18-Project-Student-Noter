import React, { useState, useContext } from 'react';
import './AddForm.css'
import AuthContext from '../context/AuthContext';
import ContentEditable from "react-contenteditable";
import QuickEdit from '../components/QuickEdit'

{/* Functional component */}
{/* Pass in props so this component can send date back to parent component (AddForm to App.js) */}
const AddForm = (props) => {
    let {authTokens} = useContext(AuthContext)

    const [categoryName, setCategoryName] = useState("");
    const [categoryID, setCategoryID] = useState("");
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState(""); 
    const [date, setDate] = useState("");
    const [time, setTime] = useState (""); 
    const [category, setCategory] = useState(0);

    // Adding a task, index or id will be the taskCount
    // const addTask = (taskInfo) => {
    //   const data = {
    //     "id": props.taskID + 1,
    //     "task": taskInfo['taskName'],
    //     "description": taskInfo['description'],
    //     "category": taskInfo['category'],
    //     "time": taskInfo['time'],
    //     "date": taskInfo['date'],
    //     "finished": false
    //   };
      
    //   props.setTaskID(props.taskID + 1);
    //   const newData = [...props.todos, data];
    //   props.setTodos(newData);
    //   console.log(newData);
    // };

  const [showAddTaskNameError, setShowAddTaskNameError] = useState(false);
  const [showAddTaskDescriptionError, setShowAddTaskDescriptionError] = useState(false);
  const [showAddTaskCategoryBlankError, setShowAddTaskCategoryBlankError] = useState(false);

  let addTask = async (taskInfo) => {

    if(taskInfo['taskName'] != "" && taskInfo['description'] != "" && props.categories[taskInfo['category']] != null)
    {

    var tempID;

    for (let i = 0; i < props.categoryDatas.length; i++){
      if (props.categoryDatas[i]["name"]== props.categories[taskInfo['category']]["name"]){
	  console.log(props.categoryDatas[i]["id"]);
        setCategoryID(props.categoryDatas[i]["id"]) 
        tempID = props.categoryDatas[i]["id"];
      }
  }


  console.log(tempID)

    let response = await fetch('/api/create/', {
      method:'POST',
      headers:{
          'Content-Type':'application/json',
          'Accept':'application/json',
          'Authorization':'Bearer ' + String(authTokens["access"]),
      },
      body:JSON.stringify({  
            "task": taskInfo['taskName'],
            "description": taskInfo['description'],
            "category": parseInt(tempID),
            "time": taskInfo['time'],
            "date": taskInfo['date'],
            "finished": false,
          })
      })
    let data = await response.json()
      const newData = [...props.todos, data];
      props.setTodos(newData);
    } else
    {
   //   alert("Cannot leave task name and description blank! Try again!");
   if(taskInfo['taskName'] == "")
   {
    setShowAddTaskNameError(true);
   }
   if(taskInfo['description'] == "")
   {
    setShowAddTaskDescriptionError(true);
   }
   if(props.categories[taskInfo['category']] == null)
   {
    setShowAddTaskCategoryBlankError(true);
   }
  }
}

    return (
      <div className="addform">
        {/* Alignment to keep text to the left */}
        <div className="alignment">

          {/* Title of popup */}
          <div className="sameLine">
            <p className="titleaddform"> <b> Add </b> </p>
            <button className="closeButton" onClick={() => props.onHide()}> X </button>
          </div>

          <hr className="addformhr"/>

          {/* Each item contains a name to input and the input box. Input box sets the item info into the state. */}
          <div className="item">
            <p className="nomargin"> <b> Task Name </b> </p>
            <div className="ta" contentEditable="true" onInput={e => {setTaskName(e.target.innerHTML); setShowAddTaskNameError(false);}}/>
            <p style={{display: showAddTaskNameError ? "block" : "none", color: "red"}}> Cannot leave task name blank! </p>
          </div>

          <div className="item">
            <p className="nomargin"> <b> Description </b> </p>
            <div className="tadescription" contentEditable="true" onInput={e => {console.log(e.target.innerHTML); setDescription(e.target.innerHTML); setShowAddTaskDescriptionError(false);}}/>
            <p style={{display: showAddTaskDescriptionError ? "block" : "none", color: "red"}}> Cannot leave description blank! </p>
          </div>

          <div className="item">
            <p className="nomargin"> <b> Date </b> </p>
            <input className="ta" type="date" onChange={e => setDate(new Date(e.target.value + " 00:00:00").toLocaleDateString())}/>
          </div>

          <div className="item">
            <p className="nomargin"> <b> Time </b> </p>
            <input className="ta" type="time" onChange={e => setTime(e.target.value)}/>
          </div>
          
          <div className="item">
            <p className="nomargin"> <b> Category </b> </p>
            <select id="choice" value={category} onChange={e => {setCategory(e.target.value); console.log(e.target.value);}}>
              {Object.entries(props.categories).map(([key, value]) => (
                <option key={"add_form_option" + key} value={key}>{props.categories[key].name}</option>
              ))}
            </select>
            <p style={{display: showAddTaskCategoryBlankError && props.categories.length <= 0 ? "block" : "none", color: "red"}}> Cannot leave category blank! Add a category!</p>
          </div>

          {/* Add button takes the state and puts it into a list to call parent function, addTask. addTask is performed here. */}
          <div className="addformbuttoncontainer">
            <button className="addformbutton" onClick={e => addTask({taskName, description, date, time, category})}> Add </button>
          </div>

        </div>

      </div>
    );
}

export default AddForm;