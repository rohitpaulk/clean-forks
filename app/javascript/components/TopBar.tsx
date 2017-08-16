import * as React from 'react';

interface TopBarProps {
    // TODO: Add avatar details
    // username: string
    // avatarUrl: string
}

export function TopBar(props: TopBarProps) {
    return <div className="top-bar">
        <div className="top-bar-inner">
            <span className="logo-img"></span>
            <span className="logo-txt">Clean Forks</span>
        </div>
    </div>;
}
