export const getTag = (tag, xml) => {
  const tagList = xml.getElementsByTagName(tag);
  return tagList.length > 0 ? tagList[0].textContent : null;
};

export const getItems = (xml) => {
  const items = [...xml.getElementsByTagName('item')];
  return items;
};
