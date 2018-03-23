export const getTitle = (xml) => {
  const titles = xml.getElementsByTagName('title');
  return titles.length > 0 ? titles[0].textContent : 'No title found';
};

export const getDescription = (xml) => {
  const descriptions = xml.getElementsByTagName('description');
  return descriptions.length > 0 ? descriptions[0].textContent : 'No description found';
};

export const getLink = (xml) => {
  const links = xml.getElementsByTagName('link');
  return links.length > 0 ? links[0].textContent : '#';
};

export const getItems = (xml) => {
  const items = [...xml.getElementsByTagName('item')];
  return items;
};

export const getGuid = (xml) => {
  const guids = xml.getElementsByTagName('guid');
  return guids[0].textContent || '';
};
