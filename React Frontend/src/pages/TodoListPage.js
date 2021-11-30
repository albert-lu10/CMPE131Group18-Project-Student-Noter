import React,{useContext} from 'react'
import Header from '../components/Header';
import FilterTodoList from '../components/FilterTodoList'
import AuthContext from '../context/AuthContext';
// import {useParams} from "react-router-dom";
import LeftPanel from '../components/LeftPanel';


const TodoListPages = (props) => {
  return (
      <div>
          <LeftPanel/>
          <Header categories={props.categories} setCategories={props.setCategories} todos={props.todos} 
          setTodos={props.setTodos} taskID={props.taskID} setTaskID={props.setTaskID} categoryDatas={props.categoryDatas} setCategoryDatas={props.setCategoryDatas}/>
          <FilterTodoList
            todos={props.todos}
            setTodos={props.setTodos}
            categories={props.categories}
            categoryDatas={props.categoryDatas} 
            setCategoryDatas={props.setCategoryDatas}
            filter={(todo, st) => st.length < 1 ? true : Object.values(todo)
              .join(" ")
              .toLowerCase()
              .includes(st.toLowerCase())
            }
          />
          <br/>
      </div>
  )
}

export default TodoListPages
  