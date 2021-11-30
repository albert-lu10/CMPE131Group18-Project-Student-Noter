import React from 'react'
import './TitleHeader.css'

const TitleHeader = (props) => {
    return (
        <div>
            <div className="header">
                <h3>{props.listName}</h3>
            </div>
        </div>
    )
}

export default TitleHeader
