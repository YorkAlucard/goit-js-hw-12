import { markup } from '/js/render-functions';
import { removeLoadStroke } from '/js/render-functions';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorIcon from '../img/error.svg';

const box = document.querySelector('.gallery');
const load = document.querySelector('.loader');
const addMoreButton = document.querySelector('.load-more-button');
const iziOption = {
  messageColor: '#FAFAFB',
  messageSize: '16px',
  backgroundColor: '#EF4040',
  iconUrl: errorIcon,
  transitionIn: 'bounceInLeft',
  position: 'topRight',
  displayMode: 'replace',
  closeOnClick: true,
};
let page = 1;
let perPage = 15;

export function resetPage() {
  page = 1;
}
export function addPage() {
  page += 1;
}

function endOfList(daddyElement) {
  removeLoadStroke(daddyElement);
  daddyElement.insertAdjacentHTML(
    'beforeend',
    '<p class="loading-text">We\'re sorry, but you\'ve reached the end of search results .</p>'
  );
  addMoreButton.classList.add('hide');
}

export async function getImage(input) {
  const API_KEY = '48872034-56219959c0c25d0366fcef29b';
  const query = encodeURIComponent(input);
  const urlParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: perPage,
  });
  const URL = `https://pixabay.com/api/?${urlParams}`;

  try {
    const { data } = await axios.get(URL);
    markup(data);
    if (data.totalHits < page * perPage) {
      endOfList(load);
      return;
    }
    if (page >= 2) {
      const list = document.querySelector('.gallery__item');
      const rect = list.getBoundingClientRect();
      window.scrollBy({
        top: rect.height * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    console.error(error);
    box.innerHTML = '';
    load.innerHTML = '';
    iziToast.show({
      ...iziOption,
      message: 'Sorry, an error happened. Try again',
    });
    return;
  }
}
