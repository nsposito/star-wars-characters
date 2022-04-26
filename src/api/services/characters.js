import { request } from './base';
import { apiURL } from '../apiURL';

export const getCharacters = page => request(apiURL.getCharactersByPage + page, 'get');
