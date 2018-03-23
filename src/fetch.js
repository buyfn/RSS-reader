import axios from 'axios';
import renderFeed from './render';

const addFeed = (url, mountNode, proxy = '') => {
  axios.get(`${proxy}${url}`)
    .then((res) => {
      const parser = new DOMParser();
      const { data } = res;
      const xml = parser.parseFromString(data, 'text/xml');
      mountNode.prepend(renderFeed(xml));
    });
};

export default addFeed;
