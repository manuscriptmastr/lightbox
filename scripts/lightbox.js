var lightbox = (images, parent) => {



var body = document.querySelector('body');
var currentImg;



// Helper functions

var setLightboxImg = (index) => {
  var currentImg = galleryImages[index];
  lightboxImg.src = currentImg.src;
  
  openLightbox();
}

var nextLightboxImg = (currIndex) => {
  // Figure out index of next image and call setLightboxImg
}

var prevLightboxImg = (currIndex) => {
  // Figure out index of prev image and call setLightboxImg
}

var openLightbox = () => {
  body.classList.add('lightbox-is-active');
}

var closeLightbox = () => {
  body.classList.remove('lightbox-is-active');
}

// Build lightbox wrapper

var lightbox = document.createElement('div');
lightbox.classList.add('lightbox');
body.appendChild(lightbox);



// Build gallery wrapper

var gallery = document.createElement('ul');
gallery.classList.add('gallery__list');
parent.appendChild(gallery);



// Build gallery images section

var initGalleryImages = () => {

  var imageArray = images.map(image => {
    var li = document.createElement('li');
    li.classList.add('gallery__item');
  
    var img = document.createElement('img');
    img.classList.add('gallery__img');
    img.src = image.src;
    img.alt = image.alt;
  
    img.addEventListener('click', img => setLightboxImg(img));
  
    li.appendChild(img);
    gallery.appendChild(li);

    return img;
  });

  return imageArray;
}

var galleryImages = initGalleryImages();



// Build lightbox with image and buttons

var initLightbox = () => {

  var firstImg = galleryImages[0];

  var lightboxImg = document.createElement('img');
  lightboxImg.classList.add('lightbox__img');
  lightboxImg.src = firstImg.src;
  lightboxImg.alt = firstImg.alt;

  var setupBtn = (action, src) => {
    var btn = document.createElement('a');
    btn.classList.add(`lightbox__${action}`);
    btn.href = '#';

    var icon = document.createElement('img');
    icon.src = src;
    icon.alt = action;

    btn.appendChild(icon);

    return btn;
  }

  var closeBtn = setupBtn('close','assets/icon-close.svg');
  var nextBtn = setupBtn('next','assets/icon-arrow-right.svg');
  var prevBtn = setupBtn('prev','assets/icon-arrow-left.svg');

  var layout = document.createElement('div');
  layout.classList.add('lightbox__layout');

  var layoutChildren = [prevBtn, lightboxImg, nextBtn];
  layoutChildren.forEach(child => layout.appendChild(child));

  var lightboxChildren = [layout, closeBtn];
  lightboxChildren.forEach(child => lightbox.appendChild(child));

  lightbox.appendChild(layout);

  return lightboxImg;
}

var lightboxImg = initLightbox();



}