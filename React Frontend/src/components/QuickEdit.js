import React, { useState } from 'react';
import './QuickEdit.css'
import ContentEditable from "react-contenteditable";

const QuickEdit = ({ className, value, setValue }) => {
  const [editingValue, setEditingValue] = useState(value);
  const contentEditable=React.createRef();
  function transformation(data) {
    const test = `${data}`;
    return test;
  }
  const onChange = (event) => setEditingValue(event.target.value);

  const onKeyDown = (event) => {
    if ( event.key === "Escape") {
      event.target.blur();
    }
  }

  const onBlur = (event) => {
    setValue(editingValue)
  }

  return (
    <ContentEditable
    innerRef={contentEditable}
    html={transformation(editingValue)}

    className= {className == null ? "quickEditInput" : className}
      type="text"
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      maxLength={30} 
      size={30}
    />
  )
}

export default QuickEdit;