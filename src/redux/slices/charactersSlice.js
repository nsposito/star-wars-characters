import { createSlice } from '@reduxjs/toolkit';
import { getCharacters } from '../../api/services/characters';

export const charactersSlice = createSlice({
	name: 'characters',
	initialState: {
		charactersList: [],
		previous: null,
		next: null,
		currentPage: 1,
		loading: false,
		modifiedCharacters: [],
		isFavoritesDisplayed: false,
	},
	reducers: {
		setCharactersList: (state, action) => {
			state.charactersList = action.payload;
			state.loading = false;
		},
		setPreviousPage: (state, action) => {
			state.previous = action.payload;
		},
		setNextPage: (state, action) => {
			state.next = action.payload;
		},
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
		setLoading: state => {
			state.loading = true;
		},
		setModifiedCharacters: (state, action) => {
			state.modifiedCharacters = action.payload;
		},
		setDisplayFavorites: state => {
			state.isFavoritesDisplayed = !state.isFavoritesDisplayed;
		},
	},
});

export const {
	setCharactersList,
	setPreviousPage,
	setNextPage,
	setCurrentPage,
	setLoading,
	setModifiedCharacters,
	setDisplayFavorites,
} = charactersSlice.actions;

export default charactersSlice.reducer;

export const onGetCharacters = page => async dispatch => {
	dispatch(setLoading());
	const response = await getCharacters(page);

	if (response?.error) {
		dispatch(setCharactersList([]));
	} else if (response?.results) {
		dispatch(setCharactersList(response.results));
		dispatch(setPreviousPage(response.previous));
		dispatch(setNextPage(response.next));
	}
};

export const onSetCurrentPage = currentPage => dispatch => {
	dispatch(setCurrentPage(currentPage));
};

export const onSetCharactersList = charactersList => dispatch => {
	dispatch(setCharactersList(charactersList));
};

export const onDisplayFavorites = () => dispatch => {
	dispatch(setDisplayFavorites());
};
