import * as React from 'react';
import { User } from "../models";

interface TopBarProps {
    user: User | null
}

interface TopBarState {
    isDropdownOpen: boolean
}

function Dropdown(props: {heading: string}) {
    return <div className="dropdown-container">
        <div className="dropdown-header">
            <span>{props.heading}</span>
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

export class TopBar extends React.Component<TopBarProps, TopBarState> {
    // TODO: Render empty avatar when user is not fetched
    constructor(props) {
        super(props)

        this.state = {isDropdownOpen: false};
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    toggleDropdown(e) {
        e.preventDefault();
        this.setState(prevState => ({
            isDropdownOpen: !prevState.isDropdownOpen
        }));
    }

    render() {
        return <div className="top-bar">
            <div className="top-bar-inner">
                <div className="left-group">
                    <span className="logo-img"></span>
                    <span className="logo-txt">Clean Forks</span>
                </div>
                {this.props.user &&
                    <div className="right-group">
                        <div className="dropdown-toggle" onClick={this.toggleDropdown}>
                            <img className="avatar-img"
                                 src={this.props.user.avatarUrl}>
                            </img>
                            <span className="arrow-icon"></span>
                        </div>
                        {this.state.isDropdownOpen &&
                            <Dropdown heading={this.props.user.username}/>}
                    </div>
                }
            </div>
        </div>;
    }
}
