import React, { useState, useContext, useParams, useEffect } from 'react';
import './CategoryForm.css'
import AuthContext from '../context/AuthContext';
import { data } from 'jquery';


{/* Functional component */}
{/* Allow props to be passed from this component to parent component. */}
const CategoryForm = (props) => {
    let {authTokens} = useContext(AuthContext)
    const [tempCategoryInput, setTempCategoryInput] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [categoryID, setCategoryID] = useState("");

    
    let addCategoryInput = async (tempCategoryInput) => {
        if(tempCategoryInput != "")
        {
            if(props.categories.filter(e => e.name === tempCategoryInput).length <= 0)
            {
                let response = await fetch('/api/category-create/', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json',
                    'Authorization':'Bearer ' + String(authTokens["access"]),
                },
                body:JSON.stringify({  
                    "name": tempCategoryInput})
            })
            let data = await response.json()
                const data2 = { 
                    "id":props.categories.length+1,
                    "name": data.name,
                };
                props.setCategories(oldCategories => [...oldCategories, data2]);
                let categoryResponse =await fetch("/api/category", {
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':'Bearer ' + String(authTokens["access"])
                    }
                })
                let categoryData= await categoryResponse.json()
                props.setCategoryDatas(categoryData)
                console.log(props.categories)
            }
            else
            {
                alert("Duplicate categories are not allowed!");
            }
        }
        else
        {
        alert("Category cannot be left blank!");
        }
    }


    
    function getCategoryNameFromID(id)
    {
        var filteredData = props.categoryDatas.filter(p => p.id === id);
        if(filteredData.length > 0)
        {
            console.log(filteredData[0].name);
            return filteredData[0].name;
        }
        else
        {
            return null;
        }
    }

    const deleteCategory = async (id,name) => {
        console.log(id)
        console.log(name)
        if(props.todos.filter(e => getCategoryNameFromID(e.category) === name).length <= 0)
        {
            let response = await fetch('/api/category-delete/'+name+'/', {
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json',
                    'Authorization':'Bearer ' + String(authTokens["access"]),
                },
            })            

                if(response.status === 204){
                    const numId = id.substring("dcategoryitem_".length, id.length);
                    const removed = [...props.categories];
                    removed.splice(numId, 1);
                    props.setCategories(removed);
                }
            // var mainTodos = [...props.todos];
            // mainTodos = mainTodos.filter(function(todo) { return todo.category != numId; });
            // props.setTodos(mainTodos);
        }
        else
        {
            alert("Cannot delete category! Some tasks still use it!");
        }
    };




    return (
        <div className="categoryform">

        {/* Keep everything to the left */}
            <div className="alignment">

                <div className="sameLine">
                    <p className="titlecategoryform"> <b> Category </b> </p>
                    <button className="closeButton" onClick={() => props.onHide()}> X </button>
                </div>

                <hr className="categoryformhr"/>
            
                {/* Create category list and loop through each category item to display. */}
                <div className="categorylist">
                {Object.entries(props.categories).map(([key, value]) => (
                        <div key={"categoryitemblock_" + key} className="categoryitem">
                            <p className="nomargin" id={"categoryitem_" + key}> <b> {props.categories[key].name} </b> </p>
                            {/* Delete category -> This component is a view. It should not process data. Ask model to delete category. */}
                            {key == 0 ? <button style={{display: "none"}} className="categorydeletebutton" id={"dcategoryitem_" + key} onClick={e => deleteCategory(e.target.id, props.categories[key].name)}> Delete </button> :
                            <button className="categorydeletebutton" id={"dcategoryitem_" + key} onClick={e => deleteCategory(e.target.id, props.categories[key].name)}> Delete </button>}
                            
                        </div>
                    ))}
                </div>
                
                {/* Category add area - On left is text input, on right is the button to add the category to the list. */}
                <div className="categoryaddarea">
                    <div className="textareacategory" contentEditable="true" onInput={e => setTempCategoryInput(e.target.innerHTML.replace(/&nbsp;/g, ' '))}/>
                    <div className="addcategorymodalbuttoncontainer">
                        <button className="addcategorymodalbutton" onClick={e => addCategoryInput(tempCategoryInput)}> Add </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CategoryForm;

// let response = await fetch('/api/category-delete/'+name+'/', {
//     method:'DELETE',
//     headers:{
//         'Content-Type':'application/json',
//         'Accept':'application/json',
//         'Authorization':'Bearer ' + String(authTokens["access"]),
//     },
// })