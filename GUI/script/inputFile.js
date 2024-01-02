const fileInput = document.querySelector(".js-file");
const inputContainer = document.querySelector(".js-inputContainer");
const nameImgContainer = document.querySelector(".js-fileNameContainer");
const imagesInterface = document.querySelector(".imagesInterface");
let selectedFiles = [];

const handleFileSelect = () => {
  nameImgContainer.innerHTML = "";
  selectedFiles = [];
  const files = event.target.files;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileName = file.name;
    selectedFiles.push(file);
    const fileItemDiv = document.createElement("div");
    fileItemDiv.classList.add("fileItem");

    const fileNameDiv = document.createElement("div");
    fileNameDiv.textContent = fileName;
    fileNameDiv.classList.add("titleImage");

    const fileNameDeleteIcon = document.createElement("div");
    fileNameDeleteIcon.classList.add("deleteIcon");
    fileNameDeleteIcon.innerHTML =
      '<i class="deletePhotoBtn fa-solid fa-trash fa-xl"></i>';

    fileItemDiv.appendChild(fileNameDeleteIcon);

    fileItemDiv.appendChild(fileNameDiv);
    fileItemDiv.classList.add("imageNameDiv");
    if (file.type.startsWith("image/")) {
      const thumbnailDiv = document.createElement("div");
      thumbnailDiv.classList.add("thumbnail");

      const thumbnailImg = document.createElement("img");
      thumbnailImg.classList.add("thumbnailImg");
      thumbnailImg.src = URL.createObjectURL(file);
      thumbnailImg.alt = fileName;

      thumbnailDiv.appendChild(thumbnailImg);
      fileItemDiv.appendChild(thumbnailDiv);
    }

    nameImgContainer.appendChild(fileItemDiv);
  }

  deletePhoto();
};

fileInput.addEventListener("change", () => {
  imagesInterface.style.display = "block";
  handleFileSelect();
  showImagesInterface();
});

const showImagesInterface = () => {
  nameImgContainer.style.display = "block";
  inputContainer.style.display = "none";
  imagesInterface.style.display = "block";
};

const showMainInterface = () => {
  nameImgContainer.style.display = "none";
  inputContainer.style.display = "block";
  imagesInterface.style.display = "none";
  const fileForm = document.querySelector(".fileForm");
  fileForm.reset();
};

const deletePhoto = () => {
  let deletePhotoBtn = document.querySelectorAll(".deletePhotoBtn");

  let iconsLenght = deletePhotoBtn.length;

  if (iconsLenght == 1) {
    deletePhotoBtn = document.querySelector(".deletePhotoBtn");
    deletePhotoBtn.addEventListener("click", () => {
      iconsLenght -= 1;
      deletePhotoBtn.parentElement.parentElement.style.display = "none";
      showMainInterface();
    });
  } else {
    deletePhotoBtn.forEach((icon, index) => {
      icon.addEventListener("click", () => {
        icon.parentElement.parentElement.style.display = "none";
        iconsLenght -= 1;
        selectedFiles.splice(index, 1);
        if (iconsLenght == 0) {
          showMainInterface();
        }
      });
    });
  }
};
