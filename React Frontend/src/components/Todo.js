import React,{useState,useContext} from 'react'
import './Todo.css'
import {FaPencilAlt, FaRegTrashAlt, FaCheckCircle, FaRegCircle, FaChevronDown} from "react-icons/fa";
import { map } from 'jquery';
import randomColor from 'randomcolor';
import QuickEdit from '../components/QuickEdit.js'
import AuthContext from '../context/AuthContext';
import Parser from 'html-react-parser';

const Todo= (props) => {
    let {authTokens} = useContext(AuthContext)

    let categoryValue=""
    const {id,task,category,dueTime,dueDate,description,finished}=props.todo

    const [toggle,setToggle]=useState(false)
    console.log(toggle);
    for (let i = 0; i < props.categoryDatas.length; i++){
        if (props.categoryDatas[i]["id"]==category){
            categoryValue=props.categoryDatas[i]["name"]
        }
    }

    var color = randomColor({luminosity: "light", format: 'rgba'});
    color = color.replace(/[^\d,]/g, '').split(',');
    console.log(props.categories);
    console.log(props.categoryDatas);
    var color1 = "rgba(126, 214, 223, 0.6)";
    var color2 = "rgba(126, 214, 223, 0.3)";
    
    // if (props.categoryDatas!=null){
    //     for (let i = 0; i < Object.keys(props.categoryDatas).length; i++){
    //         if (props.categoryDatas[i]["id"]==category){
    //             setCategoryValue(props.categoryDatas[i]["name"])
    //         }
    //     }
    // }

    const handleAdjustClick = async (id, description) => {
        console.log(id);
        console.log(description)
        let response = await fetch('/api/update/'+id+'/', {
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Authorization':'Bearer ' + String(authTokens["access"]),
        },
        body:JSON.stringify({  
                "description": description,
            })
        })
        let data = await response.json()
        console.log(data)
        props.todo.description = description;
    };

    return (
        <div className="to-do-area-full">
            <div className="to-do-table-main" onClick={(e)=> {setToggle(!toggle);}} style={{background: "linear-gradient(to right, " + color1 + ", " + color2 + ")", color: 'black', boxShadow: '3px 5px 5px ' + color2}}>
                <div className="child" id="finishButton"> {finished ? <button id="finishButtonInside" onClick={(e) => {e.stopPropagation(); props.handleFinishedClick(id);}}> <FaCheckCircle/> </button> : <button id="finishButtonInsideEmpty" onClick={(e) => {e.stopPropagation(); props.handleFinishedClick(id);}}> <FaRegCircle/> </button> }</div>
                <div className="child" id="box1"><p className="task">{Parser(task)}</p></div>
                <div className="child" id="box2"><p className="category" >{Parser(category != -1 ? props.categoryDatas.find(x => x.id === category).name : "")}</p></div>
                <div className="child" id="box3"><p className="time" >{dueTime}</p></div>
                <div className="child" id="box4"><p className="date" >{dueDate}</p></div>
                <div className="child" id="box6"><button className="delete" onClick={(e) => {e.stopPropagation(); props.handleDeleteClick(id);}}>          <FaRegTrashAlt></FaRegTrashAlt></button></div>
                <div className="child" id="box7"> <FaChevronDown className={toggle ? "chevron-click" : "chevron"} /> </div>
            </div>
            {toggle ?
                <div className="to-do-table-description" style={{background: "linear-gradient(to right, " + color1 + ", " + color2 + ")", color: 'black', boxShadow: '3px 5px 5px ' + color2}}>
                <div className="child" id="finishButton"/>
                <QuickEdit className="description" id="des1" value={description} setValue={(des) => {handleAdjustClick(id, des);}}/>
                </div>: null
            }
        </div>
    )
}
export default Todo
