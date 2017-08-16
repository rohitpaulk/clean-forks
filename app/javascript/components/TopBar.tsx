import * as React from 'react';

interface TopBarProps {
    // TODO: Add avatar details
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
                <img className="avatar-img" src={props.avatarUrl}></img>
                <span className="arrow-icon"></span>
            </div>
        </div>
    </div>;
}
