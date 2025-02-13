//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const errorDiv = document.getElementById("error");
const loadingDiv = document.getElementById("loading");
const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
function downloadImage(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${imageUrl}`);
  });
}

async function downloadImages() {
  loadingDiv.style.display = "block"; 
  errorDiv.innerHTML = ""; 
  output.innerHTML = ""; 

  try {
    const imagePromises = images.map(image => downloadImage(image.url));
    const downloadedImages = await Promise.all(imagePromises);

    downloadedImages.forEach(img => {
      output.appendChild(img); 
    });
  } catch (error) {
    errorDiv.innerHTML = error; 
  } finally {
    loadingDiv.style.display = "none"; 
}

btn.addEventListener("click", downloadImages);

