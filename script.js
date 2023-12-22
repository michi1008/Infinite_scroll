const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

//  Upsplash API
const count = 5;
const apiKey = 'M3U8sO6B2NbP6kVtI0bFzF-ORtu02TNkzXuAiFMLIl4';
const apiUrl = `https://api.unsplash.com/photos/random/?
client_id=${apiKey}&count=${count}`;

// Check if all iamges were loaded
function imageLoaded() {   
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}
// Create Elements for Links & Photos, Add dto DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photoArray.length;
    // Run function for each object in photosArray
    photoArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blnak',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Event Listner, check when each is finished loading
        img.addEventListener('load', imageLoaded)
        // Put <img> inside <a>, then put put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
       const response = await fetch(apiUrl) ;
       photoArray = await response.json();
        displayPhotos()
    } catch (error) {
        // Catch Error here
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos();

    }
})

// On Load 
getPhotos()