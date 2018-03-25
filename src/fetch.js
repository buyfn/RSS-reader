import axios from 'axios';
import { parseFeed } from './parse';

const fetchFeed = (url, proxy = '') =>
  axios.get(`${proxy}${url}`)
    .then((res) => {
      const { data } = res;
      const feed = { url, ...parseFeed(data) };
      return feed;
    });

export default fetchFeed;
