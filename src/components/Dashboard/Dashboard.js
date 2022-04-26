import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import CharacterDetails from './CharacterDetails/CharacterDetails';
import './Dashboard.css';
import MainPage from './MainPage';

const Dashboard = () => {
	return (
		<>
			<Header />
			<div className="dashboard-container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/characterDetails/:name" element={<CharacterDetails />} />
				</Routes>
			</div>
		</>
	);
};

export default Dashboard;
