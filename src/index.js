import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import validator from 'validator';

const corsProxy = 'https://crossorigin.me/';

const state = {
  inputString: '',
  isValidURL: false,
};

const getTitle = (xml) => {
  const titles = xml.getElementsByTagName('title');
  return titles.length > 0 ? titles[0].textContent : 'No title found';
};

const getDescription = (xml) => {
  const descriptions = xml.getElementsByTagName('description');
  return descriptions.length > 0 ? descriptions[0].textContent : 'No description found';
};

const getLink = (xml) => {
  const links = xml.getElementsByTagName('link');
  return links.length > 0 ? links[0].textContent : '#';
};

const getItems = (xml) => {
  const items = [...xml.getElementsByTagName('item')];
  return items;
};

const renderItem = (item) => {
  const title = document.createTextNode(getTitle(item));
  const titleTag = document.createElement('p');
  titleTag.append(title);

  const link = document.createElement('a');
  link.append(titleTag);
  link.href = getLink(item);

  const itemTag = document.createElement('li');
  itemTag.append(link);

  return itemTag;
};

const validateUrl = urlString => validator.isURL(urlString);

const addFeed = (xml) => {
  const feedList = document.getElementById('feeds');

  const title = document.createTextNode(getTitle(xml));
  const description = document.createTextNode(getDescription(xml));
  const items = getItems(xml);

  const titleTag = document.createElement('h2');
  titleTag.append(title);

  const descriptionTag = document.createElement('p');
  descriptionTag.append(description);

  const itemList = document.createElement('ul');
  const itemTags = items.map(renderItem);
  itemTags.forEach(item => itemList.append(item));

  const li = document.createElement('li');
  li.append(titleTag);
  li.append(descriptionTag);
  li.append(itemList);

  feedList.prepend(li);
};

const getFeed = (url) => {
  axios.get(`${corsProxy}${url}`)
    .then((res) => {
      const parser = new DOMParser();
      const { data } = res;
      const xml = parser.parseFromString(data, 'text/xml');
      addFeed(xml);
    });
};

const input = document.getElementById('feedURL');
// validate input value upon change
input.addEventListener('input', () => {
  state.value = input.value;
  state.isValidURL = validateUrl(state.value);
  if (state.isValidURL || state.value === '') {
    input.classList.remove('is-invalid');
  } else {
    input.classList.add('is-invalid');
  }
});

const submit = document.getElementById('addButton');
// handle add button press
submit.addEventListener('click', (e) => {
  e.preventDefault();
  if (state.isValidURL && state.value) {
    getFeed(state.value);
    state.value = '';
    input.value = state.value;
  }
});
