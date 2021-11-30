import React, { useRef, useState, useContext, useEffect } from "react";
import  Todo from "./Todo";
import 'bootstrap/dist/css/bootstrap.min.css'
import {FaSearch} from "react-icons/fa";
import './FilterTodoList.css'
import Popup from '../components/Popup.js'
import AuthContext from '../context/AuthContext';


const TodoList = (props) => {
  let {authTokens} = useContext(AuthContext)

  const inputEl = useRef("");
  const [search, setSearch] = useState("");

  const [showAdjustPopup, setShowAdjustPopup] = useState(false);
  const [currentIDToEdit, setCurrentIDToEdit] = useState(0);
  const [currentAdjustInfo, setCurrentAdjustInfo] = useState({});
  const [currentAdjustDescription, setCurrentAdjustDescription] = useState();
  const [currentAdjustDescription2, setCurrentAdjustDescription2] = useState();

  const handleDeleteClick = async (taskId) => {
    console.log(typeof(taskId))
    let response = await fetch('/api/delete/'+taskId+'/', {
      method:'DELETE',
      headers:{
          'Content-Type':'application/json',
          'Accept':'application/json',
          'Authorization':'Bearer ' + String(authTokens["access"]),
      },
  })
  if(response.status === 204){
    console.log(props.todos);
    const newTodos = [...props.todos];
    const index = props.todos.findIndex((contact) => contact.id === taskId);
    newTodos.splice(index, 1);
    props.setTodos(newTodos);}
  };
  // const handleDeleteClick = (taskId) => {
  //   console.log(props.todos);
  //   const newTodos = [...props.todos];
  //   const index = props.todos.findIndex((contact) => contact.id === taskId);
  //   newTodos.splice(index, 1);
  //   props.setTodos(newTodos);
  // };

  const [rerender, setRerender] = useState(false);

    useEffect(()=>{
      setRerender(!rerender);
    }, []);

  const handleFinishedClick = async (id) => {
    // console.log(id);
    const index = props.todos.findIndex((contact) => contact.id === id);
    console.log(props.todos[index]["finished"])
    let response = await fetch('/api/finished-update/'+id+'/', {
      method:'PUT',
      headers:{
          'Content-Type':'application/json',
          'Accept':'application/json',
          'Authorization':'Bearer ' + String(authTokens["access"]),
      },
      body:JSON.stringify({  
            "finished": !props.todos[index]["finished"],
          })
      })
      let data = await response.json()
    const newTodos = [...props.todos];
    Object.keys(newTodos).some(function(key) {
      if(newTodos[key].id == id) {
        newTodos[key].finished = data.finished;
        return true;
      }
    });
    props.setTodos(newTodos);
  };

  const renderTodoList = 
    props.todos.filter(todo => {
      return props.filter(todo, search);
    }).map((todo) => {
        return (
          <div style={{paddingTop: '1em'}}>
              <Todo
              todo={todo}
              key={todo.id}
              categories={props.categories}
              categoryDatas={props.categoryDatas} 
              handleDeleteClick={handleDeleteClick}
              handleFinishedClick={handleFinishedClick}
              todos={props.todos}
              setTodos={props.setTodos}
            />
          </div>
        );
    });

  const getSearchTerm = () => {
      console.log(search);
    setSearch(inputEl.current.value);
  };

  return (
    <div className="main">

      <div className="search-bar">
        <input
          ref={inputEl}
          type="text"
          placeholder="Search tasks information..."
          className="search-box"
          value={props.term}
          onChange={getSearchTerm}
 
        />
        <FaSearch></FaSearch>
      </div>

      <div id="title">
                <div className="child" id="head0"><p><b></b></p></div>
                <div className="child" id="head1"><p><b>Task</b></p></div>
                <div className="child" id="head2"><p><b>Category</b></p></div>
                <div className="child" id="head3"><p><b>Time</b></p></div>
                <div className="child" id="head4"><p><b>Date</b></p></div>
                <div className="child" id="head5"><p></p></div>
                <div className="child" id="head6"> </div>
            </div>
        {renderTodoList.length > 0
          ? renderTodoList
          : <div className="no-task">No task available</div>}

    </div>
  );
};

export default TodoList;
