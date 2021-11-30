import './App.css';
// import Header from './components/Header'
import React, { useState, useEffect, useContext } from "react";
// import data from "./mock-data.json";
// import data from "./mock-data.json";
// import TodoList from './components/TodoList';
// import Popup from './components/Popup.js'
// import AdjustForm from './components/AdjustForm';
import { Route, Routes} from "react-router-dom";
import TodoListPages from './pages/TodoListPage';
import DailyPage from './pages/DailyPage';
import UpcomingPage from './pages/UpcomingPage';
import FinishPage from './pages/FinishPage';
import PrivateRoute from './utils/PrivateRoute'
import LogInPage from './pages/LogInPage';
import AuthContext from './context/AuthContext';
import Register from './pages/RegisterPage';
import PastPage from './pages/PastPage';
// import axiosInstance from'./utils/axiosInstance'
// export const findToken = () => {
//   const token =localStorage.getItem("token") 

//   return token;
// };
const App = () => {
  let {authTokens} = useContext(AuthContext)
  const [taskID, setTaskID] = useState();
  let [todoDatas, setTodoDatas]=useState([]);
  let [categoryDatas, setCategoryDatas]=useState([]);

  let CategoryArray=[];


  const [categories, setCategories] = useState([]);

  useEffect(()=> {
    if (authTokens!=null){    
      getTodoList()
    }
  }, [authTokens])

let getTodoList= async() =>{
  let todoResponse =await fetch("/api/todos", {
    method:'GET',
    headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens["access"]),
    }
  })

    let categoryResponse =await fetch("/api/category", {
    method:'GET',
    headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
    }
  })
  let categoryData= await categoryResponse.json()
    let todoData= await todoResponse.json()
    setCategoryDatas(categoryData)
    console.log(categoryData)
    setTodoDatas(todoData)
    if (categoryData[0]!=null){
      for (let i = 0; i < (Object.keys(categoryData).length); i++){
        CategoryArray.push({'id':i,'name':categoryData[i]['name'],})
      }
    setCategories(CategoryArray)
    }
    setTaskID(todoData.length)
}

  return (
      <div className="app">
        <Routes>
          <Route  path="/daily/" element={<PrivateRoute><DailyPage todos={todoDatas} setTodos={setTodoDatas} categories={categories} setCategories={setCategories} 
          taskID={taskID} setTaskID={setTaskID} categoryDatas={categoryDatas} setCategoryDatas={setCategoryDatas}/></PrivateRoute>} />

          <Route path="/todolist/" element={<PrivateRoute><TodoListPages todos={todoDatas} setTodos={setTodoDatas} categories={categories} setCategories={setCategories} 
          taskID={taskID} setTaskID={setTaskID} categoryDatas={categoryDatas} setCategoryDatas={setCategoryDatas}/></PrivateRoute>}/>

          <Route path="/upcoming/" element={<PrivateRoute><UpcomingPage todos={todoDatas} setTodos={setTodoDatas} categories={categories} setCategories={setCategories} 
          taskID={taskID} setTaskID={setTaskID} categoryDatas={categoryDatas} setCategoryDatas={setCategoryDatas}/></PrivateRoute>}/>

          <Route path="/past/" element={<PrivateRoute><PastPage todos={todoDatas} setTodos={setTodoDatas} categories={categories} setCategories={setCategories} 
          taskID={taskID} setTaskID={setTaskID} categoryDatas={categoryDatas} setCategoryDatas={setCategoryDatas}/></PrivateRoute>}/>

          <Route path="/finish/" element={<PrivateRoute><FinishPage todos={todoDatas} setTodos={setTodoDatas} categories={categories} setCategories={setCategories} 
          taskID={taskID} setTaskID={setTaskID} categoryDatas={categoryDatas} setCategoryDatas={setCategoryDatas}/></PrivateRoute>}/>

          <Route exact path='/' element={<LogInPage categoryDatas={categoryDatas} setCategoryDatas={setCategoryDatas}/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
        </Routes>
      </div>
  );
}


export default App;

