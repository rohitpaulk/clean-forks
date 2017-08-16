import * as React from 'react';
import { User } from "../models";

interface TopBarProps {
    user: User | null
}

interface TopBarState {
    isDropdownOpen: boolean
}

interface DropdownProps {
    heading: string,
    containerRef: any
}

class Dropdown extends React.Component<DropdownProps, undefined> {
    render() {
        return <div className="dropdown-container" ref={this.props.containerRef}>
            <div className="dropdown-header">
                <span>{this.props.heading}</span>
            </div>
            <div className="dropdown-item-group">
                <div className="dropdown-item">
                    <a href="#">Settings</a>
                </div>
                <div className="dropdown-item">
                    <a href="/logout">Sign Out</a>
                </div>
            </div>
        </div>;
    }
}

export class TopBar extends React.Component<TopBarProps, TopBarState> {
    dropdownContainerRef: any

    constructor(props) {
        super(props)

        this.state = {isDropdownOpen: false};
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setDropdownContainerRef = this.setDropdownContainerRef.bind(this);
    }

    setDropdownContainerRef(node) {
        this.dropdownContainerRef = node;
    }

    toggleDropdown(e) {
        e.preventDefault();

        if (this.state.isDropdownOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    handleClickOutside(e) {
        if (!this.dropdownContainerRef.contains(e.target)) {
            e.preventDefault();
            this.closeDropdown();
        }
    }

    openDropdown() {
        document.addEventListener('click', this.handleClickOutside);
        this.setState({isDropdownOpen: true});
    }

    closeDropdown() {
        document.removeEventListener('click', this.handleClickOutside);
        this.setState({isDropdownOpen: false});
    }

    render() {
        // TODO: Render empty avatar when user is not fetched
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
                            <Dropdown heading={this.props.user.username} containerRef={this.setDropdownContainerRef} />}
                    </div>
                }
            </div>
        </div>;
    }
}
