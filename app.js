import {data, headersArray, rowsPerPage} from './data.js';

const personTemplate = document.querySelector('#person-template').content;

const thead = document.querySelector('thead');
const tr = thead.querySelector('tr');
const headerTemplate = document.querySelector('#header-template').content;

const tbody = document.querySelector('tbody');

const tfoot = document.querySelector('tfoot');
const previousButton = tfoot.querySelector('#previous');
const nextButton = tfoot.querySelector('#next');
const currentPage = tfoot.querySelector('#currentPage');
const resultsCount = tfoot.querySelector('.results-count');
resultsCount.textContent = `${rowsPerPage} Results`;

for (let i = 0; i < headersArray.length; i++) {
  const headerNode = headerTemplate.cloneNode(true);
  const headerButton = headerNode.querySelector('.sort');
  const th = headerNode.querySelector('th');

  th.textContent = headersArray[i].header;
  th.appendChild(headerButton);
  th.classList.add(headersArray[i].class);

  tr.appendChild(headerNode);
}

const emptyTh = document.createElement('th');
tr.appendChild(emptyTh);

const clearTablePage = () => {
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
}

const setTablePage = (array, startIndex, endIndex) => {
  clearTablePage();
  for (let i = startIndex; i < endIndex; i++) {
    const personNode = personTemplate.cloneNode(true);

    const id = personNode.querySelector('.id');
    id.textContent = array[i].id;

    const name = personNode.querySelector('.name input');
    name.value = array[i].name;

    const email = personNode.querySelector('.email input');
    email.value = array[i].email;

    const title = personNode.querySelector('.title input');
    title.value = array[i].title;

    tbody.appendChild(personNode);
  }
}

setTablePage(data, 0, rowsPerPage);

// const sortArray = (array, field) => {
//   array.sort((a, b) => a[field] - b[field]);
// };

const sortButtons = thead.querySelectorAll('.sort');

sortButtons.forEach(sortButton => {
  sortButton.addEventListener('click', (evt) => {

    sortButtons.forEach(sortButton => {
      sortButton.classList.remove('descending');
      sortButton.classList.remove('ascending');
    });

    switch (evt.target.className.baseVal) {
      case 'descending':
        sortButton.classList.add('descending');
        // sortToggler();
        break;
      case 'ascending':
        sortButton.classList.add('ascending');
        // sortToggler();
        break;
    }
  });
});

nextButton.addEventListener('click', () => {
  switch (currentPage.value) {
    case '1':
      setTablePage(data, rowsPerPage, rowsPerPage * 2);
      currentPage.value = '2';
    break;
    case '2':
      setTablePage(data, rowsPerPage * 2, rowsPerPage * 3);
      currentPage.value = '3';
    break;
  }
});

previousButton.addEventListener('click', () => {
  switch (currentPage.value) {
    case '2':
      setTablePage(data, 0, rowsPerPage);
      currentPage.value = '1';
    break;
    case '3':
      setTablePage(data, rowsPerPage, rowsPerPage * 2);
      currentPage.value = '2';
    break;
  }
});
