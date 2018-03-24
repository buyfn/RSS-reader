import $ from 'jquery';
import { getTitle, getDescription, getLink, getItems, getGuid } from './parse';

const renderItem = (item) => {
  const title = getTitle(item);
  const href = getLink(item);
  const description = getDescription(item);
  const guid = getGuid(item);

  const modal = $(`<div class="modal" role="dialog" tabindex="-1" id=${guid}/>`)
    .append($('<div class="modal-dialog" role="document"/>')
      .append($('<div class="modal-content"/>')
        .append($('<div class="modal-header"/>')
          .append(`<h3 class="modal-title">${title}</h3>`))
        .append($('<div class="modal-body"/>')
          .append(`<p>${description}</p>`))));

  const modalButton = $(`<button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#${guid}">Check out</button>`);

  return $(`<li class="py-1"><a class="mx-sm-2" href="${href}">${title}</a></li>`)
    .append(modalButton)
    .append(modal)
    .get(0);
};

const renderFeed = (xml) => {
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

  return li;
};

export default renderFeed;
