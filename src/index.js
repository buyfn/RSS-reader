import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import $ from 'jquery';
import validator from 'validator';
import addFeed from './fetch';

const corsProxy = 'https://crossorigin.me/';

const state = {
  inputString: '',
  isValidURL: false,
};

const feedList = $('#feeds').get(0);
const input = document.getElementById('feedURL');
const submit = document.getElementById('addButton');

// validate input value upon change
input.addEventListener('input', () => {
  state.value = input.value;
  state.isValidURL = validator.isURL(state.value);
  if (state.isValidURL) {
    input.classList.remove('is-invalid');
    submit.disabled = false;
  } else {
    input.classList.add('is-invalid');
    submit.disabled = true;
  }
});

// handle add button press
submit.addEventListener('click', (e) => {
  e.preventDefault();
  if (state.isValidURL && state.value) {
    addFeed(state.value, feedList, corsProxy);
    state.value = '';
    input.value = state.value;
  }
});
