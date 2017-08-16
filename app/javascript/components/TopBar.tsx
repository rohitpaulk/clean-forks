import * as React from 'react';
import { User } from "../models";

interface TopBarProps {
    user: User | null
}

function Dropdown(props: {username: string}) {
    return <div className="dropdown-container">
        <div className="dropdown-header">
            <span>{props.username}</span>
        </div>
        <div className="dropdown-item-group">
            <div className="dropdown-item">
                <a href="#">Settings</a>
            </div>
            <div className="dropdown-item">
                <a href="#">Sign Out</a>
            </div>
        </div>
    </div>;
}

export function TopBar(props: TopBarProps) {
    // TODO: Render empty avatar when user is not fetched
    return <div className="top-bar">
        <div className="top-bar-inner">
            <div className="left-group">
                <span className="logo-img"></span>
                <span className="logo-txt">Clean Forks</span>
            </div>
            {props.user &&
                <div className="right-group">
                    <img className="avatar-img" src={props.user.avatarUrl}></img>
                    <span className="arrow-icon"></span>
                    <Dropdown username={props.user.username}/>
                </div>}
        </div>
    </div>;
}
