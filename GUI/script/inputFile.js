const fileInput = document.querySelector(".js-file");
const inputContainer = document.querySelector(".js-inputContainer");
const nameImgContainer = document.querySelector(".js-fileNameContainer");
const handleFileSelect = () => {
  nameImgContainer.innerHTML = "";

  const files = event.target.files;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileName = file.name;

    const fileItemDiv = document.createElement("div");
    fileItemDiv.classList.add("fileItem");

    const fileNameDiv = document.createElement("div");
    fileNameDiv.textContent = fileName;
    fileNameDiv.classList.add('titleImage')

    const fileNameDeleteIcon = document.createElement("div");
    fileNameDeleteIcon.classList.add('deleteIcon')
    fileNameDeleteIcon.innerHTML = '<i class="deletePhotoBtn fa-solid fa-trash fa-xl"></i>'
    
    fileItemDiv.appendChild(fileNameDeleteIcon);

    fileItemDiv.appendChild(fileNameDiv);
    fileItemDiv.classList.add("imageNameDiv");
    if (file.type.startsWith("image/")) {
      const thumbnailDiv = document.createElement("div");
      thumbnailDiv.classList.add("thumbnail");

      const thumbnailImg = document.createElement("img");
      thumbnailImg.classList.add('thumbnailImg')
      thumbnailImg.src = URL.createObjectURL(file);
      thumbnailImg.alt = fileName;

      thumbnailDiv.appendChild(thumbnailImg);
      fileItemDiv.appendChild(thumbnailDiv);
    }

    nameImgContainer.appendChild(fileItemDiv);
  }
};

fileInput.addEventListener("change", () => {
  handleFileSelect();
  nameImgContainer.style.display = "block";
  inputContainer.style.display = "none";
});
