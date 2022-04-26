import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CharacterItem from './CharacterItem/CharacterItem';
import './CharactersList.css';

const CharactersList = () => {
	const { charactersList, modifiedCharacters } = useSelector(state => state.characters);
	const [columnA, setColumnA] = useState([]);
	const [columnB, setColumnB] = useState([]);

	const setColumns = useCallback(() => {
		if (charactersList.length === 0) return;

		const halfway = Math.ceil(charactersList.length / 2);
		const newColumnA = charactersList.slice().splice(0, halfway);
		const newColumnB = charactersList.slice().splice(halfway);
		setColumnA([...newColumnA]);
		setColumnB([...newColumnB]);
	}, [charactersList]);

	useEffect(() => {
		setColumns();
	}, [charactersList, modifiedCharacters, setColumns]);

	return (
		<div className="main-container">
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
		</div>
	);
};

export default CharactersList;
