import { configureStore } from '@reduxjs/toolkit';
import characters from './slices/charactersSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { combineReducers } from 'redux';

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
};

const reducer = combineReducers({
	characters: characters,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export default configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});
