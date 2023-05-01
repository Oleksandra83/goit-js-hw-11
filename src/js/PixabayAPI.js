import axios from "axios";

const API_KEY = '35923777-83922d327ace7b1107788efbd';
const per_page = 40;
let totalPages = 0;

async function getPhotos(query, page) {
	const params = new URLSearchParams({
		key: API_KEY,
		q: query,
		image_type: 'photo',
		orientation: 'horizontal',
		safesearch: true,
		per_page: per_page,
		page: page,
	});

	const resp = await axios.get(`https://pixabay.com/api/?${params}`);
	totalPages = resp.data.totalHits / per_page;
	return resp;
}

export{getPhotos, totalPages}
