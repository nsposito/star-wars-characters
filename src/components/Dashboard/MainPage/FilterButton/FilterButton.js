import React from 'react';
import { useDispatch } from 'react-redux';
import { onDisplayFavorites } from '../../../../redux/slices/charactersSlice';
import './FilterButton.css';

const FilterButton = () => {
	const dispatch = useDispatch();

	const onHandleDisplayFavorites = () => {
		dispatch(onDisplayFavorites());
	};

	const filterButton = 'Filtrar por favoritos';

	return (
		<div className="filter-container">
			<button className="filter-button" onClick={onHandleDisplayFavorites}>
				{' '}
				{filterButton}{' '}
			</button>
		</div>
	);
};

export default FilterButton;
