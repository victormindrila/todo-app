import React from 'react';

class Dropdown extends React.Component {
	constructor(props) {
		super(props);
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	setWrapperRef(node) {
		this.wrapperRef = node;
	}

	handleClick() {
		//todo
	}

	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			this.props.setShowDropDown(false);
		}
	}

	render() {
		return (
			<div
				ref={this.setWrapperRef}
				className={`w-100 dropdown-menu dropdown-menu-right ${this.props.show ? 'show' : ''}`}>
				<button
					className='dropdown-item text-center'
					onClick={() => {
						this.handleClick();
					}}>
					Log Out
				</button>
			</div>
		);
	}
}

export default Dropdown;
