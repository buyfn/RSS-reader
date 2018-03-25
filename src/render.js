import $ from 'jquery';
import { getTag, getItems } from './parse';

const renderItem = (item) => {
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

  return $(`<li class="py-1"><a class="mx-sm-2" href="${href}">${title}</a></li>`)
    .append(modalButton)
    .append(modal)
    .get(0);
};

const renderFeed = (xml) => {
  const title = document.createTextNode(getTag('title', xml));
  const description = document.createTextNode(getTag('description', xml));
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
