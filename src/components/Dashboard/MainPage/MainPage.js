import React, { useEffect } from 'react';
import './MainPage.css';
import CharactersList from './CharactersList';
import Pagination from './Pagination/Pagination';
import FilterButton from './FilterButton';
import FavoritesList from './FavoritesList/FavoritesList';
import { useDispatch, useSelector } from 'react-redux';
import { onGetCharacters } from '../../../redux/slices/charactersSlice';
import { Spinner } from 'react-activity';
import 'react-activity/dist/Spinner.css';

const MainPage = () => {
	const dispatch = useDispatch();
	const { isFavoritesDisplayed, charactersList, loading, currentPage } = useSelector(
		state => state.characters
	);

	useEffect(() => {
		dispatch(onGetCharacters(currentPage));
	}, [currentPage, dispatch]);

	return (
		<div className="main-container">
			{loading ? (
				<div className="spinner-container">
					<Spinner color="white" />
				</div>
			) : charactersList.length > 0 ? (
				<>
					<FilterButton />
					{isFavoritesDisplayed ? (
						<FavoritesList />
					) : (
						<>
							<CharactersList />
							<Pagination />
						</>
					)}
				</>
			) : (
				<p className="error-message">Oops, algo salió mal. Intenta recargar la pantalla</p>
			)}
		</div>
	);
};

export default MainPage;
