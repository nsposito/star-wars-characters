import axios from 'axios';

export const request = async (url, method) => {
	console.log('🚀 ~ file: base.js ~ line 4 ~ request ~ url', url);
	let header = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	};

	const config = {
		headers: header,
		method: method,
		url: url,
	};

	try {
		const response = await axios(config);
		if (response.status === 200) return response.data;
	} catch (err) {
		const response = {
			error: JSON.stringify(err),
		};
		return response;
	}
};
