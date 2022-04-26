import React, { useCallback, useEffect, useState } from 'react';
import './CharacterItem.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setModifiedCharacters } from '../../../../../redux/slices/charactersSlice';
import { selectedFavIcon } from '../../../../../utils/icons/favIcons';
import AlertModal from '../../../../AlertModal/AlertModal';

const CharacterItem = ({ url }) => {
	const dispatch = useDispatch();
	const { modifiedCharacters, charactersList } = useSelector(state => state.characters);
	const [displayedCharacter, setDisplayedCharacter] = useState([]);
	const [loading, setLoading] = useState(true);
	const [openAlert, setOpenAlert] = useState(false);

	const getDisplayCharacter = useCallback(() => {
		let newCharacter = modifiedCharacters.find(item => item.url === url);

		if (newCharacter === undefined) {
			newCharacter = charactersList.find(item => item.url === url);
		}

		setDisplayedCharacter(newCharacter);
		setLoading(false);
	}, [modifiedCharacters, charactersList, url]);

	useEffect(() => {
		getDisplayCharacter();
	}, [modifiedCharacters, charactersList, getDisplayCharacter]);

	const setSubtitle = () => {
		let gender = displayedCharacter.gender;
		if (gender !== 'n/a') gender = gender.charAt(0).toUpperCase() + gender.slice(1);

		const newSubtitle = `${gender} | Birth date ${displayedCharacter.birth_year}`;

		return <span className="subtitle">{newSubtitle}</span>;
	};

	const onConfirmDelete = () => {
		const isCharacterSaved = modifiedCharacters.some(item => item.url === displayedCharacter.url);
		let newCharactersList;

		if (isCharacterSaved) {
			newCharactersList = modifiedCharacters.filter(item => item.url !== displayedCharacter.url);
		} else {
			newCharactersList = [...modifiedCharacters];
		}

		const newCharacter = {
			...displayedCharacter,
			isDeleted: true,
		};
		newCharactersList.push(newCharacter);

		dispatch(setModifiedCharacters([...newCharactersList]));
	};

	const onHandleDelete = () => {
		setOpenAlert(true);
	};

	return (
		<>
			{loading ? (
				<></>
			) : displayedCharacter.isDeleted ? (
				<></>
			) : (
				<div className="main-container">
					<div className="item-container">
						<button className="delete-button" onClick={onHandleDelete}>
							X
						</button>
						<div className="information-container">
							<Link
								to={'/characterDetails/' + displayedCharacter.name}
								style={{ textDecoration: 'none' }}
							>
								<div className="title-container">
									<div className="character-name-container">
										<span className="character-name">{displayedCharacter.name}</span>
									</div>

									<div className="fav-icon">
										{displayedCharacter.isFavorite ? selectedFavIcon('20') : <></>}
									</div>
								</div>
								<div className="subtitle-container">{setSubtitle()}</div>
							</Link>
						</div>
					</div>
					<div className="alert-container">
						{openAlert ? (
							<AlertModal
								setOpenAlert={setOpenAlert}
								title={'Seguro que quieres borrar?'}
								message={'Si borras, la acción no se podrá deshacer'}
								firstButton={'cancelar'}
								secondButton={'borrar'}
								customButtonAction={onConfirmDelete}
							/>
						) : (
							<></>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default CharacterItem;
