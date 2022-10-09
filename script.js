const apiKey = 'iAOEm6wfWUpnw1i7Hwqe-FUnEs9uUpxKx6-cR_bxu_k';
const count = 3;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// const apiUrl = `https://picsum.photos/v2/list?limit=3`;

let loadedImage = 0;
let ready = true;
const loadingCircle = document.querySelector('.loading');
const imageDescription = document.querySelector('.image-description');

const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      console.log(entries[0]);
      imageDescription.innerText = entries[0].target.alt;
    }
  },
  { threshold: 0.7 }
);

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    getPhotos();
  }
}

function createImageDOM(data) {
  const img = document.createElement('img');
  console.log(data);
  img.src = data.urls.regular;
  img.alt = data.user.name;

  // img.src = data.download_url;
  // img.alt = Math.random();
  img.addEventListener('load', () => {
    loadedImage++;
    if (loadedImage >= count) {
      ready = true;
      loadingCircle.hidden = true;
    }
  });
  imageContainer.appendChild(img);

  observer.observe(img);
}

const imageContainer = document.querySelector('.image');

function loadingPhotos() {
  ready = false;
  getPhotos().then((data) =>
    data.forEach((element) => {
      createImageDOM(element);
    })
  );
}

loadingPhotos();

imageContainer.addEventListener('scroll', (e) => {
  if (
    window.innerHeight + imageContainer.scrollTop >=
    imageContainer.scrollHeight - 500
  ) {
    if (ready) {
      loadingPhotos();
    }
  }
});
