import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModifiedCharacters } from '../../../../redux/slices/charactersSlice';
import './FavoriteButton.css';
import { unSelectedFavIcon, selectedFavIcon } from '../../../../utils/icons/favIcons';

const FavoriteButton = ({ character }) => {
	const dispatch = useDispatch();

	const { modifiedCharacters } = useSelector(state => state.characters);
	const [isFavorite, setIsFavorite] = useState(false);

	const setFavorite = useCallback(() => {
		let savedCharacter = modifiedCharacters.find(item => item.url === character.url);

		if (savedCharacter === undefined) {
			setIsFavorite(false);
			return;
		}

		setIsFavorite(savedCharacter.isFavorite);
	}, [modifiedCharacters, character]);

	useEffect(() => {
		setFavorite();
	}, [modifiedCharacters, character, setFavorite]);

	const editIsFavorite = () => {
		const isCharacterSaved = modifiedCharacters.some(item => item.url === character.url);
		let newCharactersList;

		if (isCharacterSaved) {
			newCharactersList = modifiedCharacters.filter(item => item.url !== character.url);
			const newCharacter = {
				...character,
				isFavorite: !isFavorite,
			};
			newCharactersList.push(newCharacter);
		} else {
			newCharactersList = [...modifiedCharacters];
			const newCharacter = {
				...character,
				isFavorite: true,
			};
			newCharactersList.push(newCharacter);
		}

		dispatch(setModifiedCharacters(newCharactersList));
	};

	return (
		<>
			{isFavorite ? (
				<button className="button-isFavorite" onClick={editIsFavorite}>
					{selectedFavIcon('22')}
				</button>
			) : (
				<button className="button-isNotFavorite" onClick={editIsFavorite}>
					{unSelectedFavIcon('22')}
				</button>
			)}
		</>
	);
};

export default FavoriteButton;
