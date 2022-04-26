import React, { useCallback, useEffect, useState } from 'react';
import { Spinner } from 'react-activity';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setModifiedCharacters } from '../../../redux/slices/charactersSlice';
import AlertModal from '../../AlertModal/AlertModal';
import FavoriteButton from './FavoriteButton/FavoriteButton';
import './CharacterDetails.css';

const CharacterDetails = () => {
	const dispatch = useDispatch();
	const { name } = useParams();
	const navigate = useNavigate();
	const { charactersList, modifiedCharacters } = useSelector(state => state.characters);
	const [character, setCharacter] = useState([]);
	const [editedName, setEditedName] = useState('');
	const [editedAmountOfFilms, setEditedAmountOfFilms] = useState('');
	const [editedHeight, setEditedHeight] = useState('');
	const [editedMass, setEditedMass] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const [openAlert, setOpenAlert] = useState(false);
	const [loading, setLoading] = useState(true);

	const setNewCharacter = useCallback(() => {
		let savedCharacter = modifiedCharacters.find(item => item.name === name);

		if (savedCharacter === undefined) {
			savedCharacter = charactersList.find(item => item.name === name);
			savedCharacter = {
				...savedCharacter,
				films: savedCharacter.films.length.toString(),
			};
		}

		setCharacter(savedCharacter);
		setLoading(false);
	}, [modifiedCharacters, charactersList, name]);

	useEffect(() => {
		setNewCharacter();
	}, [setNewCharacter]);

	const onHandleGoBack = () => {
		if (isEditing) {
			setOpenAlert(true);
		} else {
			navigate(-1);
		}
	};

	const onConfirmGoBack = () => {
		navigate(-1);
		setIsEditing(false);
	};

	const onHandleIsEditing = e => {
		e.preventDefault();

		setEditedName(character.name);
		setEditedAmountOfFilms(character.films);
		setEditedHeight(character.height);
		setEditedMass(character.mass);
		setIsEditing(!isEditing);
	};

	const onHandleSaveButton = e => {
		e.preventDefault();
		const isCharacterSaved = modifiedCharacters.some(item => item.url === character.url);

		let newCharactersList;

		if (isCharacterSaved) {
			newCharactersList = modifiedCharacters.filter(item => item.url !== character.url);

			const newCharacter = {
				...character,
				name: editedName,
				films: editedAmountOfFilms,
				height: editedHeight,
				mass: editedMass,
			};

			newCharactersList.push(newCharacter);
		} else {
			newCharactersList = [...modifiedCharacters];

			const newCharacter = {
				...character,
				name: editedName,
				films: editedAmountOfFilms,
				height: editedHeight,
				mass: editedMass,
				isFavorite: character.isFavorite ? character.isFavorite : false,
				isDeleted: character.isDeleted ? character.isDeleted : false,
			};

			newCharactersList.push(newCharacter);
		}

		dispatch(setModifiedCharacters(newCharactersList));
		navigate(-1);
		setIsEditing(!isEditing);
		return;
	};

	const setGender = () => {
		let gender = character.gender;
		if (gender !== 'n/a' && !loading) gender = gender.charAt(0).toUpperCase() + gender.slice(1);

		return <span className="subtitle">{gender}</span>;
	};

	return (
		<div className="main-container">
			<div className="back-button-container">
				<button className="go-back-button" onClick={onHandleGoBack}>
					{'< Volver al listado'}
				</button>
			</div>

			<div className="card-container">
				{!loading ? (
					<>
						<div className="title-container">
							{!isEditing ? (
								<span className="character-name">{character.name}</span>
							) : (
								<input
									className="character-name-input"
									placeholder={character.name}
									value={editedName}
									onChange={e => setEditedName(e.target.value)}
								/>
							)}
							<FavoriteButton character={character} />
						</div>
						<div className="details-container">
							{setGender()}
							<label>
								Birth Date: <span className="character-birth-date">{character.birth_year}</span>
							</label>
							<label>
								Amount of films:{' '}
								{!isEditing ? (
									<span className="character-name">{character.films}</span>
								) : (
									<input
										placeholder={character.films.length}
										value={editedAmountOfFilms}
										onChange={e => setEditedAmountOfFilms(e.target.value)}
									/>
								)}
							</label>
							<div className="footer-details-container">
								<label>
									Height:{' '}
									{!isEditing ? (
										<span className="character-height">{character.height}</span>
									) : (
										<input
											placeholder={character.height}
											value={editedHeight}
											onChange={e => setEditedHeight(e.target.value)}
										/>
									)}
								</label>
								<label className="mass-label">
									| Mass:{' '}
									{!isEditing ? (
										<span className="character-name">{character.mass}</span>
									) : (
										<input
											placeholder={character.mass}
											value={editedMass}
											onChange={e => setEditedMass(e.target.value)}
										/>
									)}
								</label>
							</div>
						</div>
						<div className="edit-button-container">
							{!isEditing ? (
								<button className="edit-button" onClick={onHandleIsEditing}>
									Editar
								</button>
							) : (
								<button className="save-button" onClick={onHandleSaveButton}>
									Guardar cambios
								</button>
							)}
						</div>
					</>
				) : (
					<Spinner color="white" />
				)}
			</div>
			{openAlert ? (
				<AlertModal
					setOpenAlert={setOpenAlert}
					title={'Tienes cambios sin guardar'}
					message={'Si abandonas la página sin guardar perderás los cambios realizados'}
					firstButton={'cancelar'}
					secondButton={'abandonar página'}
					customButtonAction={onConfirmGoBack}
				/>
			) : (
				<></>
			)}
		</div>
	);
};

export default CharacterDetails;
