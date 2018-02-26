var lightbox = (images, parent) => {

var body = document.querySelector('body');
var currentIndex = 0;

// Set lightbox image given an index

var setLightboxImg = (index) => {
  var img = galleryImages[index];
  lightboxImg.src = img.src;
  currentIndex = index;
  
  openLightbox();
}

// Calculate indices

var modulo = (num, div) => (((num % div) + div) % div);

var getNewIndex = (index, count, offset) => modulo(index + offset, count);

// Get index of next image and set new lightboxImg

var nextLightboxImg = () => {
  console.log('Setting next image');
  var newIndex = getNewIndex(currentIndex, galleryImages.length, 1);
  setLightboxImg(newIndex);
}

// Get index of previous image and set new lightboxImg

var prevLightboxImg = () => {
  console.log('Setting previous image');
  var newIndex = getNewIndex(currentIndex, galleryImages.length, -1);
  setLightboxImg(newIndex);
}

var openLightbox = () => {
  console.log('Lightbox is open');
  body.classList.add('lightbox-is-active');
}

var closeLightbox = () => {
  console.log('Lightbox is closed');
  body.classList.remove('lightbox-is-active');
}

// Listen for escape key to close lightbox

window.addEventListener('keyup', e => {
  e.preventDefault();
  if(e.code === 'Escape') {
    closeLightbox();
  }
});

// Build lightbox wrapper

var lightbox = document.createElement('div');
lightbox.classList.add('lightbox');
body.appendChild(lightbox);

// Build gallery wrapper

var gallery = document.createElement('ul');
gallery.classList.add('gallery__list');
parent.appendChild(gallery);

// Build gallery images section with event listeners

var initGalleryImages = () => {

  var imageArray = images.map((image, index) => {
    var li = document.createElement('li');
    li.classList.add('gallery__item');
  
    var img = document.createElement('img');
    img.classList.add('gallery__img');
    img.src = image.src;
    img.alt = image.alt;
  
    img.addEventListener('click', e => setLightboxImg(index));
  
    li.appendChild(img);
    gallery.appendChild(li);

    return img;
  });

  return imageArray;
}

// Build lightbox with image, buttons, and event listeners

var initLightbox = () => {

  // Set lightbox image to first gallery image
  var firstImg = galleryImages[currentIndex];

  var lightboxImg = document.createElement('img');
  lightboxImg.classList.add('lightbox__img');
  lightboxImg.src = firstImg.src;
  lightboxImg.alt = firstImg.alt;

  // Helper function to setup lightbox buttons
  var setupBtn = (action, src, listener) => {
    var btn = document.createElement('a');
    btn.classList.add(`lightbox__${action}`);
    btn.href = '#';

    var icon = document.createElement('img');
    icon.src = src;
    icon.alt = action;

    btn.appendChild(icon);

    btn.addEventListener('click', e => {
      e.preventDefault();

      listener();
    });

    return btn;
  }

  // Create lightbox buttons

  var closeBtn = setupBtn('close', 'assets/icon-close.svg', closeLightbox);
  var nextBtn = setupBtn('next', 'assets/icon-arrow.svg', nextLightboxImg);
  var prevBtn = setupBtn('prev', 'assets/icon-arrow.svg', prevLightboxImg);

  // Build layout and listen for escape key

  var layout = document.createElement('div');
  layout.classList.add('lightbox__layout');
  layout.addEventListener('click', e => {
    e.preventDefault();
    if(e.target === layout) {
      closeLightbox();
    }
  });

  // Build lightbox

  var layoutChildren = [prevBtn, lightboxImg, nextBtn];
  layoutChildren.forEach(child => layout.appendChild(child));

  var lightboxChildren = [layout, closeBtn];
  lightboxChildren.forEach(child => lightbox.appendChild(child));

  lightbox.appendChild(layout);

  return lightboxImg;
}

// Initialize gallery and lightbox
var galleryImages = initGalleryImages();
var lightboxImg = initLightbox();

}