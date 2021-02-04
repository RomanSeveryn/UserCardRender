'use strict';



const mapOfContacs = new Map();
mapOfContacs.set('www.facebook.com', '/assets/icons/facebook.png');
mapOfContacs.set('twitter.com', '/assets/icons/Twitter.png');
mapOfContacs.set('www.instagram.com', '/assets/icons/instagramm.png');

const cardsContainer = document.getElementById('root');




const jsonUsers = fetch(
  "./assets/js/data.json")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((err) => {
    console.log('Error')
  });
  
  
  const cards = responseData.map((user) => createUserCards(user));
  //.filter((place) => place.firstName) - после map поставить для проверки на имя.
  cardsContainer.append(...cards);
  

function createUserCards(user) {
  const icons = createIcons(user.contacts);
  const card = createElement('li', { classNames: ['cardWrapper'] }, [
    createElement('article', { classNames: ['cardContainer'] }, [
      createImageWrapper(user),
      fullName(user),
      createInfoPharagraph(),
      createElement('ul', { classNames: ['containerIcon'] }, [
        ...icons,
      ]),
    ]),
  ]);
  return card;
}

function createIcons(contacts = []) {
  const contactLink = contacts.map((link) => {
    const url = new URL(link);

    const pathOfIcon = mapOfContacs.get(url.hostname);
    const img = document.createElement('img');
    img.setAttribute('src', pathOfIcon);
    img.classList.add('iconWrapper');

    const linkOfContacs = document.createElement('a');
    linkOfContacs.setAttribute('href', '#');
    linkOfContacs.classList.add('link');
    linkOfContacs.append(img);
    // console.log(linkOfContacs);
    // console.log(url);
    return linkOfContacs;
  })

  return contactLink;
}


function fullName(user) {
  const { firstName, lastName } = user;
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

function createImageWrapper(user) {
  const { firstName, id } = user;
  const imageWrapper = document.createElement('div');
  imageWrapper.setAttribute('id', `wrapper${id}`)
  imageWrapper.classList.add('cardImageWrapper');
  imageWrapper.style.backgroundColor = stringToColour(firstName);

  const initials = document.createElement('div');
  initials.classList.add('initials');
  initials.append(document.createTextNode(firstName[0] || ''));

  imageWrapper.append(initials, createImage(user, { className: 'cardImage' }));
  return imageWrapper;
}

function createImage({ firstName, profilePicture, id }) {
  const img = document.createElement('img');
  img.classList.add('cardImage');
  img.dataset.id = id;
  img.setAttribute('alt', firstName);
  img.setAttribute('src', profilePicture);

  img.addEventListener('error', handleImageErorr);
  // img.addEventListener('load', handleImageLoad);
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