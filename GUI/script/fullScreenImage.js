fileInput.addEventListener("change", () => {
  const images = document.querySelectorAll(".thumbnailImg");

  images.forEach((image) => {
    image.addEventListener("click", (event) => {
      console.log(event.currentTarget);

      







    });
  });
});
