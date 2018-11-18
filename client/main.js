function setup() {
    fetchPhotos()
        .then(photos => {
            render(photos);
            zoomPhoto(photos[0]);
            //displayPhotoInner(photos)
        });
}


function fetchPhotos() {
    return fetch('http://localhost:3000/photos')
        .then(x => x.json())
        .finally(_ => console.log())
        .catch(error => console.log(error));
}

function render(photos) {
    console.log(photos);
    const $area = document.querySelector('#app');
    photos.forEach(photo => {
        const $img = document.createElement('img');
        $img.setAttribute('src', photo.thumb);
        $img.addEventListener("click", function(){
            zoomPhoto(photo);
            displayPhotoDitails(photo)
        }, false);
        $area.appendChild($img);

    });


}

function removeFullPhoto(sel){
    const $full = document.querySelector(sel);
    if ($full){
        $full.remove();
    }
}

// zmienna ma przechowywać

function displayPhotoDitails(photo){
    const $area = document.querySelector('#app');



    const template = `
     
            <p>${photo.title}</p>
            <p>${photo.author}</p>
            <p>${photo.tags.map(el => `#${el}`).join(', ')}</p>
       
    `;


    removeFullPhoto('.details');

    const $div = document.createElement('div');
    $div.classList.add('details');
    $div.innerHTML = template;

    $area.appendChild($div);
}

function zoomPhoto(photo) {
    removeFullPhoto('.full');
    const $area = document.querySelector('#app');
    console.log('PHOTO : ', photo);
    const $photo = document.createElement('img');
    $photo.setAttribute('src', photo.image);
    $photo.classList.add('full');
    $area.appendChild($photo);
}


window.addEventListener('load', setup);


