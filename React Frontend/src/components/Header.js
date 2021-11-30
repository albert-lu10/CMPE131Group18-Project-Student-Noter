import React from 'react'
import './Header.css'
import {FaFolderPlus} from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import Popup from './Popup.js'
import AddForm from './AddForm';
import CategoryForm from './CategoryForm';


const Header = (props) => {

    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showCategoryPopup, setShowCategoryPopup] = useState(false);

    return (
        <div>
            <div className="header">
                <h3>To-do List</h3>

                <div className="Add-category">
                    <button type="category-button" id="cat" title="Add category" onClick={e => { setShowCategoryPopup(!showCategoryPopup) }}><FaFolderPlus id="addFolIcon"></FaFolderPlus></button>
                </div>

                <div className="Add-task"> 
                    <button type="button" className="add-button" title="Add a task" onClick={e => { setShowAddPopup(!showAddPopup); }}> 
                    <span class="addIcon">+</span>
                    <span class="text-task">Add task</span>
                    </button>
                </div>
                <Popup show={showAddPopup} onHide={() => setShowAddPopup(false)} components={
                    <AddForm addTask={(taskInfo) => props.addTask(taskInfo)} categories={props.categories} setCategories={props.setCategories} todos={props.todos} 
                    setTodos={props.setTodos} taskID={props.taskID} setTaskID={props.setTaskID} categoryDatas={props.categoryDatas} setCategoryDatas={props.setCategoryDatas} onHide={() => setShowAddPopup(false)}/>
                }/>

                <Popup show={showCategoryPopup} onHide={() => setShowCategoryPopup(false)} components={
                    <CategoryForm categories={props.categories} addCategory={props.addCategoryInput} deleteCategory={(id) => props.deleteCategory(id)} onHide={() => setShowCategoryPopup(false)}
                    setCategories={props.setCategories} categoryDatas={props.categoryDatas} setCategoryDatas={props.setCategoryDatas} todos={props.todos}/>
                }/>
              
            </div>
            {/* <div className="line-box">
                <hr className="line" 
                    />
            </div> */}
        </div>
    )
}

export default Header
