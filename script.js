//your JS code here. If required.
document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  const loading = document.createElement("div");
  const errorDiv = document.createElement("div");
  loading.id = "loading";
  errorDiv.id = "error";
  loading.innerHTML = "Loading images...";
  output.appendChild(loading);
  output.appendChild(errorDiv);

  const images = [
    { url: "https://picsum.photos/id/237/200/300" },
    { url: "https://picsum.photos/id/238/200/300" },
    { url: "https://picsum.photos/id/239/200/300" },
  ];
  function downloadImage(image) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = image.url;
      img.onload = () => resolve(img);
      img.onerror = () => reject(`Failed to load image: ${image.url}`);
    });
  }
  function downloadImages() {
    Promise.all(images.map(downloadImage))
      .then((loadedImages) => {
        loading.style.display = "none";
        errorDiv.innerHTML = "";

        loadedImages.forEach((img) => {
          output.appendChild(img);
        });
      })
      .catch((error) => {
        loading.style.display = "none";
        errorDiv.innerHTML = error;
        errorDiv.style.color = "red";
      });
  }
  downloadImages();
});
