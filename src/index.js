import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import $ from 'jquery';
import validator from 'validator';
import fetchFeed from './fetch';
import { renderFeed, renderItem } from './render';
import { getTag } from './parse';

const corsProxy = 'https://crossorigin.me/';

const state = {
  inputString: '',
  isValidURL: false,
  lastUpdate: null,
  feeds: [],
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
  if (
    state.isValidURL &&
    state.value &&
    !(state.feeds.map(feed => feed.url).includes(state.value))
  ) {
    const newFeed = fetchFeed(state.value, corsProxy);
    newFeed.then((feed) => {
      feedList.prepend(renderFeed(feed));
      state.feeds = [...state.feeds, feed];
      state.value = '';
      state.lastUpdate = new Date();
      input.value = state.value;
      submit.disabled = true;
    });
  }
});

const update = () => {
  state.feeds.forEach((feed) => {
    const updatedFeed = fetchFeed(feed.url, corsProxy);
    updatedFeed.then((res) => {
      const newItems = res.items.filter((item) => {
        const pubDate = new Date(getTag('pubDate', item));
        return pubDate > state.lastUpdate;
      });

      if (newItems.length > 0) {
        const itemList = document.getElementById(feed.url);
        newItems.reverse().forEach(item => itemList.prepend(renderItem(item)));
      }
    }).then(() => { state.lastUpdate = new Date(); });
  });
  window.setTimeout(update, 5000);
};

update(state);
