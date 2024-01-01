fileInput.addEventListener("change", () => {
  const images = document.querySelectorAll(".thumbnailImg");
  const exitBtn = document.querySelector(".exitButton");
  const galleryContainer = document.querySelector(".galleryContainer");
  const imagesGalleryContainer = document.querySelector(".images");
  exitBtn.addEventListener("click", () => {
    galleryContainer.style.display = "none";
  });

  images.forEach((image) => {
    image.addEventListener("click", (event) => {
      galleryContainer.style.display = "flex";
      imagesGalleryContainer.src = event.currentTarget.src;
    });
  });
});
