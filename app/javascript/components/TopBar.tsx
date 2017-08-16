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
                <div className="dropdown-container">
                    <div className="dropdown-header">
                        <span>rohitpaulk</span>
                    </div>
                    <div className="dropdown-item-group">
                        <div className="dropdown-item">
                            <a href="#">Settings</a>
                        </div>
                        <div className="dropdown-item">
                            <a href="#">Sign Out</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}
