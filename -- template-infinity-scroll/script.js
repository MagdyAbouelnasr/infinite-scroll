const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []

// Unsplash API
let count = 5
const apiKey = '###'
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true
        loader.hidden = true    
        count = 20    
    }
}

// Helper Function to Set Attribute on DOM Elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

// Create Elements for Links and photos, Add to DOM
function displayPhotos(){
    imagesLoaded = 0
    totalImages = photosArray.length
    // Run function for each object in photosArray
    photosArray.forEach((photo)=>{
        // Create <a> to Link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html)
        // item.setAttribute('target', '_blank')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        // Create <img> for photo
        const img = document.createElement('img')
        // img.setAttribute('src', photo.urls.regular)
        // img.setAttribute('alt', photo.alt_description)
        // img.setAttribute('title', photo.alt_description)
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        // Event Listener, check when each is finished Loading
        img.addEventListener('load', imageLoaded)

        // Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}


// Get photos from unsplash API
async function getPhotos(){
    try {
        const response = await fetch(apiURL)
        photosArray = await response.json()
        displayPhotos()
    } catch (error) {
        console.log(error);
    }
}

// check to see if scrolling is near bottom of page, load more photos
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
            ready = false
            getPhotos()
    }
})

// on load
getPhotos();