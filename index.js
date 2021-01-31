'use strict';



const cardsContainer = document.getElementById('root');


const cards = responseData.map((place) => createPlaceCards(place));
//.filter((place) => place.firstName) - после map поставить для проверки на имя.
cardsContainer.append(...cards);




function createPlaceCards(place) {
  const card = createElement('li', { classNames: ['cardWrapper'] }, [
    createElement('article', { classNames: ['cardContainer'] }, [
      createImageWrapper(place),
      fullName(place),
      createInfoPharagraph(),
    ]),
  ]);
  return card;
}

function fullName(place) {
  const { firstName, lastName } = place;
  const wrapperFullName = document.createElement('div');
  wrapperFullName.classList.add('flex');

  const name = document.createElement('h3');
  name.classList.add('cardName');
  name.append(document.createTextNode(firstName || 'No info'));

  const surName = document.createElement('h3');
  surName.classList.add('cardName');
  surName.append(document.createTextNode(lastName));

  wrapperFullName.append(name, surName);
  return wrapperFullName;
}

function createInfoPharagraph() {
  const pharagraph = document.createElement('p');
  pharagraph.classList.add('cardDescription');
  pharagraph.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporisrem magni ullam harum dicta aspernatur fugit blanditiis laudantiumest voluptatibus.';
  return pharagraph;
}

function createImageWrapper(place) {
  const { firstName, id } = place;
  const imageWrapper = document.createElement('div');
  imageWrapper.setAttribute('id', `wrapper${id}`)
  imageWrapper.classList.add('cardImageWrapper');
  imageWrapper.style.backgroundColor = stringToColour(firstName);

  const initials = document.createElement('div');
  initials.classList.add('initials');
  initials.append(document.createTextNode(firstName[0] || ''));

  imageWrapper.append(initials, createImage(place, { className: 'cardImage' }));
  return imageWrapper;
}

function createImage({ firstName, profilePicture, id }) {
  const img = document.createElement('img');
  img.classList.add('cardImage');
  img.dataset.id = id;
  img.setAttribute('alt', firstName);
  img.setAttribute('src', profilePicture);

  img.addEventListener('error', handleImageErorr);
  img.addEventListener('load', handleImageLoad);
  return img;
}


function handleImageLoad({
  target,
  target: {
    dataset: { id },
  },
}) {
  document.getElementById(`wrapper${id}.`).append(target);
}

function handleImageErorr({ target }) {
  target.remove();
}

/**
 * 
 * @param {string} type 
 * @param {object} options
 * @param {string[]} options.classNames - css clases
 * @param {function} options.onClick - click handler
 * @param {Node[]} children 
 * @return {HTMLElement}
 */
function createElement(type, { classNames, onClick = () => { } }, children) {
  const elem = document.createElement(type);
  elem.classList.add(...classNames);
  elem.onClick = onClick;
  elem.append(...children);

  return elem;
}


function stringToColour(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}