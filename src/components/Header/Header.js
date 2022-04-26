import React from 'react';
import './Header.css';

const Header = () => {
	const title = 'Star Wars Characters';
	return (
		<header className="App-header">
			<div className="h1-header-container">
				<h1 className="header-title">{title}</h1>
			</div>
		</header>
	);
};

export default Header;
