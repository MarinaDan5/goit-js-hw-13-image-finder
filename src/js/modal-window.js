import getRefs from './refs';

import * as basicLightbox from 'basiclightbox';

const refs = getRefs();

  
refs.list.addEventListener('click', openLargeImage);

function openLargeImage(event){
    if(event.target.nodeName !== "IMG"){
        return
    }
    const largeImageURL = event.target.dataset.source;
    openMobalBasic(largeImageURL);
}

function openMobalBasic(url){
    const instance = basicLightbox.create(`
   <img src=${url} width="600" height="400">`)
    instance.show()
   
}