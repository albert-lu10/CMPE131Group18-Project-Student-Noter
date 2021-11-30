import React from 'react'
import { useState } from "react";
import FilterTodoList from '../components/FilterTodoList'
import LeftPanel from '../components/LeftPanel';
import TitleHeader from '../components/TitleHeader';

const DailyPage = (props) => {
    const current = new Date();
    const currentDate = current.getFullYear() + "-" + (current.getMonth() + 1) + "-" + current.getDate();
    console.log(currentDate);
    return (
        <div>
            <LeftPanel/>
            <TitleHeader listName={"Today's Tasks"}/>
            <FilterTodoList
            todos={props.todos}
            setTodos={props.setTodos}
            categories={props.categories}
            categoryDatas={props.categoryDatas} 
            setCategoryDatas={props.setCategoryDatas}
            filter={(todo, st) => st.length < 1 ? todo["dueDate"] == currentDate 
            : todo["dueDate"] == currentDate &&
            Object.values(todo)
              .join(" ")
              .toLowerCase()
              .includes(st.toLowerCase())
            }
          />
        </div>
    )
}

export default DailyPage
