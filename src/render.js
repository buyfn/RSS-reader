import $ from 'jquery';
import { getTag } from './parse';
import './main.css';

export const renderItem = (item) => {
  const title = getTag('title', item) || 'No title found';
  const href = getTag('link', item) || '#';
  const description = getTag('description', item) || 'No description found';

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.id = href;
  modal.innerHTML = `<div class="modal-dialog" role="document"/>
                       <div class="modal-content"/>
                         <div class="modal-header"/>
                           <h3 class="modal-title">${title}</h3>
                         </div>
                         <div class="modal-body"/>
                           <p>${description}</p>
                         </div>
                       </div>
                     </div>`;

  const modalButton = $(`<button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#${href}">Check out</button>`);

  return $(`<li class="item my-1 py-1"><a href="${href}">${title}</a></br></li>`)
    .append(modalButton)
    .append(modal)
    .get(0);
};

export const renderFeed = ({
  url, title, description, items,
}) => {
  const titleText = document.createTextNode(title);
  const titleTag = document.createElement('h3');
  titleTag.append(titleText);

  const descriptionText = document.createTextNode(description);
  const descriptionTag = document.createElement('p');
  descriptionTag.append(descriptionText);

  const itemList = document.createElement('ul');
  itemList.classList.add('items');
  itemList.id = url;
  const itemTags = items.map(renderItem);
  itemTags.forEach(item => itemList.append(item));

  const li = document.createElement('li');
  li.append(titleTag);
  li.append(descriptionTag);
  li.append(itemList);

  return li;
};
