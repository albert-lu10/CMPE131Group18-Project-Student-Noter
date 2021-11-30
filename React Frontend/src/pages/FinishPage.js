import React from 'react'
import { useState } from "react";
import FilterTodoList from '../components/FilterTodoList'
import LeftPanel from '../components/LeftPanel';
import TitleHeader from '../components/TitleHeader';

const FinishPage = (props) => {
    return (
      
        <div>
            <LeftPanel/>
            <TitleHeader listName={"Finished Tasks"}/>
           <FilterTodoList
            todos={props.todos}
            setTodos={props.setTodos}
            categories={props.categories}
            categoryDatas={props.categoryDatas} 
            setCategoryDatas={props.setCategoryDatas}
            filter={(todo, st) => st.length < 1 ? todo["finished"] == true : todo["finished"] == true && Object.values(todo)
              .join(" ")
              .toLowerCase()
              .includes(st.toLowerCase())
            }
          />
        </div>
    )
}

export default FinishPage
