import { getImage } from './js/pixabay-api.js';
import { resetPage } from './js/pixabay-api.js';
import { addPage } from './js/pixabay-api.js';
import { addLoadStroke } from './js/render-functions.js';
import errorIcon from './img/error.svg';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const box = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more-button');
const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');
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

form.addEventListener('submit', event => {
  event.preventDefault();
  let inputValue = input.value.trim();
  if (!inputValue) {
    iziToast.show({
      ...iziOption,
      message: 'Please enter a search query!',
    });
    return;
  }
  box.innerHTML = '';
  resetPage();
  addLoadStroke(loader);
  getImage(inputValue);
});

addMoreButton.addEventListener('click', event => {
  let inputValue = input.value.trim();
  addPage();
  addLoadStroke(loader);
  getImage(inputValue);
});
