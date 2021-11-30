import React, {useContext} from 'react'
import { Link} from "react-router-dom";
import './LeftPanel.css'
import AuthContext from '../context/AuthContext'
import {HiOutlineFolderOpen} from "react-icons/hi";
import {AiOutlineCheck,AiOutlineUnorderedList,AiOutlineClockCircle} from "react-icons/ai";
import {Ri24HoursFill} from "react-icons/ri";
import {MdRunningWithErrors} from "react-icons/md";




const LeftPanel = () => {
    let {authTokens, logoutUser} = useContext(AuthContext)
    let {user} = useContext(AuthContext)

    return (
        <div>
            <div className="wrap">
                <ul className="panel">
                    {user &&   <li className="item">Hello {user.first_name}!</li>}
                    <Link className="link" to="/daily"><li className="items"><Ri24HoursFill className="icon"></Ri24HoursFill><span className="button-text">Today</span></li></Link>
                    <Link className="link" to="/upcoming"><li className="items"><AiOutlineClockCircle className="icon"></AiOutlineClockCircle>Upcoming</li></Link>
                    <Link className="link" to="/past"><li className="items"><MdRunningWithErrors className="icon"></MdRunningWithErrors>Past</li></Link>
                    <Link className="link" to="/finish"><li className="items"><AiOutlineCheck className="icon"></AiOutlineCheck>Finished</li></Link>
                    <Link className="link" to="/todolist/"><li className="items"><AiOutlineUnorderedList className="icon"></AiOutlineUnorderedList>All (add)</li></Link>
                    <br/>
                    <li className="items"><HiOutlineFolderOpen className="icon"></HiOutlineFolderOpen>Category</li>
                    {user && <button onClick={logoutUser} className="logoutBut"><li className="logout">Log Out</li></button> }
                </ul>

            </div>

        </div>
    )
}

export default LeftPanel
