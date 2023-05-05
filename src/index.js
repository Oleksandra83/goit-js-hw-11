import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from "notiflix";
import { getPhotos, totalPages } from "./js/PixabayAPI";
// import { scroll } from "./js/scroll";
import { createMarkup } from "./js/createMarkup";

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const modalLightbox = new SimpleLightbox('.gallery a');
const loadMore = document.querySelector('.load-more');
let query = '';
let page = 1;

const options = {
	root: null,
	rootMargin: '100px',
	threshold: 1.0,
};

const observer = new IntersectionObserver(onloadMorePhotos, options);

// searchForm.addEventListener('change', onInput);
searchForm.addEventListener('submit', onSubmit);

async function onSearchFormSubmit() {
	try {
		const response = await getPhotos(query, page);
		addPhotos(response);
		if (page !== totalPages) {
			observer.observe(loadMore);
		}
	} catch (error) {
		console.error(error);
	}
}

async function addGalleryPage() {
	try {
		scroll();
		const response = await getPhotos(query, page);
		const photos = response.data.hits;
		createMarkup(photos);
		modalLightbox.refresh();

		if (page > totalPages) {
			Notiflix.Notify.warning("We're sorry, but you've reached the end of search result");
		}
	} catch (error) {
		console.error(error);
	}
}

// function onInput(evt) {
// 	query = evt.target.value.trim();
// 	return query;
// }

function onSubmit(evt) {
	evt.preventDefault();
	page = 1;
	gallery.innerHTML = '';
	query = evt.target.elements.searchQuery.value.trim();
	if (!query) {
		Notiflix.Notify.failure('Please, enter a search query');
		return;
	}
		onSearchFormSubmit();
	}

function addPhotos(response) {
	const photos = response.data.hits;
	
	if (!photos.length) {
		gallery.innerHTML = '';
		Notiflix.Notify.failure('Sorry, there are no photos matching your search query. Please try again');
		observer.unobserve(loadMore);
	} else {
		createMarkup(photos);
		Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} photos`);
		modalLightbox.refresh();
	}
}

function onloadMorePhotos(entries, observer) {
	entries.forEach(entry => {
		console.log(entry);
	
		if (entry.isIntersecting) {
			page += 1;
			addGalleryPage();

			if (page === totalPages) {
				observer.unobserve(loadMore);
			}
		}
	});
}

export { gallery };