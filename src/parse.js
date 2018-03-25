export const getTag = (tag, xml) => {
  const tagList = xml.getElementsByTagName(tag);
  return tagList.length > 0 ? tagList[0].textContent : null;
};

export const getItems = (xml) => {
  const items = [...xml.getElementsByTagName('item')];
  return items;
};

export const parseFeed = (str) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(str, 'text/xml');

  const title = getTag('title', dom);
  const description = getTag('description', dom);
  const items = getItems(dom);

  return { title, description, items };
};
