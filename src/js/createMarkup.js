import { gallery } from '../index';

function createMarkup(photos) {
	const markup = photos.map(photo => {
		const { tags,
			webformatURL,
			largeImageURL,
			likes,
			views,
			comments,
			downloads,
		} = photo;
		return `
			<a href="${largeImageURL}" class="card__item js-card-link">
			<div class="photo-card">
				<img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" />
			</div>
			<div class="info">
				<p class="info-item">
				<b>Likes</b> <br> ${likes}</p>
				<p class="info-item">
				<b>Views</b> <br> ${views}</p>
				<p class="info-item">
				<b>Comments</b> <br> ${comments}</p>
				<p class="info-item">
				<b>downloads</b> <br> ${downloads}</p>
			</div>
			</a>`;
		}
	).join('');
	gallery.insertAdjacentHTML('beforeend', markup)
}

export { createMarkup };