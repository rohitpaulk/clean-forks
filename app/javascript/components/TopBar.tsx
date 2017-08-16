import * as React from 'react';

interface TopBarProps {
    // TODO: Add avatar details
    username: string
    avatarUrl: string
}

export function TopBar(props: TopBarProps) {
    return <div className="top-bar">
        <div className="top-bar-inner">
            <div className="left-group">
                <span className="logo-img"></span>
                <span className="logo-txt">Clean Forks</span>
            </div>
            <div className="right-group">
                <span className="username">{props.username}</span>
                <img className="avatar-img" src={props.avatarUrl}></img>
            </div>
        </div>
    </div>;
}
