import './sass/main.scss';
import './js/modal-window';


import API from './js/apiService';
import getRefs from './js/refs';


import imageCardTpl from './tamplates/image-card';
import NewsApiService from './js/apiService';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';


const refs = getRefs();
const newApiService = new NewsApiService();


refs.form.addEventListener('submit', onSearch)

function onSearch(e) {
  e.preventDefault();
  newApiService.query = e.currentTarget.elements.query.value;
  
  if (newApiService.query === '') {
     return  error({
      title: `Введите Ваш запрос`,
        styling: 'brighttheme',
       delay: 3000,
    });
  }
  newApiService.resetPage();
  clearImageList();
    newApiService.fetchArticles().then(hits => {
      renderImageList(hits)
       newApiService.incrementPage()
    })
  }

function renderImageList(hits) {
  refs.list.insertAdjacentHTML('beforeend', imageCardTpl(hits))
  if (hits.length === 0) {
    return  error({
      title: `По Вашему запросу ничего не найдено`,
        styling: 'brighttheme',
       delay: 3000,
    });
  }
}

function clearImageList() {
  refs.list.innerHTML = '';
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && newApiService.query !== '' )
      newApiService.fetchArticles().then(renderImageList);
  });

  const options = {
    rootMargin: '200px',
  }
});

observer.observe(document.querySelector('#container'));
