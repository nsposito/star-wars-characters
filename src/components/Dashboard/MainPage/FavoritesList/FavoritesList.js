import React, { useCallback, useEffect, useState } from 'react';
import { Spinner } from 'react-activity';
import { useSelector } from 'react-redux';
import CharacterItem from '../CharactersList/CharacterItem/CharacterItem';
import './FavoritesList.css';

const FavoritesList = () => {
	const { modifiedCharacters } = useSelector(state => state.characters);
	const [columnA, setColumnA] = useState([]);
	const [columnB, setColumnB] = useState([]);
	const [loading, setLoading] = useState(true);
	const [favoritesList, setFavoritesList] = useState([]);

	const setColumns = useCallback(() => {
		setLoading(true);
		if (modifiedCharacters.length > 0) {
			const favoritesList = modifiedCharacters.filter(item => item.isFavorite === true);

			if (favoritesList.length > 0) {
				setFavoritesList(favoritesList);
				const halfway = Math.ceil(favoritesList.length / 2);
				setColumnA(favoritesList.slice().splice(0, halfway));
				setColumnB(favoritesList.slice().splice(halfway));
			}
		}

		setLoading(false);
	}, [modifiedCharacters]);

	useEffect(() => {
		setColumns();
	}, [setColumns]);

	return (
		<div className="main-container">
			{loading ? (
				<div className="spinner-container">
					<Spinner color="white" />
				</div>
			) : favoritesList.length > 0 ? (
				<div className="list-container">
					<div className="columnA-container">
						{columnA.map((character, index) => (
							<CharacterItem {...character} key={index} />
						))}
					</div>
					<div className="columnB-container">
						{columnB.length > 0 ? (
							columnB.map((character, index) => <CharacterItem {...character} key={index} />)
						) : (
							<></>
						)}
					</div>
				</div>
			) : (
				<p className="no-favorites-message">
					No hay favoritos guardados, prueba con agregar algunos!
				</p>
			)}
		</div>
	);
};

export default FavoritesList;
