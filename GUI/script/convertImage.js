const sharp = require("sharp");
const JSZip = require("jszip");
const startConvertBtn = document.querySelector(".js-startConvert");

startConvertBtn.addEventListener("click", () => {
  convertAndDownloadZip();
});

async function convertAndDownloadZip() {
  const fileInput = document.querySelector(".js-file");
  const files = fileInput.files;

  if (files.length === 0) {
    alert("Please select at least one image file.");
    return;
  }

  const zip = new JSZip();
  const convertPromises = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    const convertPromise = new Promise(async (resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async function (event) {
        const inputBuffer = new Uint8Array(event.target.result);

        try {
          const { data, info } = await sharp(inputBuffer)
            .toFormat("webp")
            .toBuffer({ resolveWithObject: true });

          if (info.format === "webp") {
            zip.file(file.name.replace(/\.[^/.]+$/, "") + ".webp", data);
          } else {
            const webpBuffer = await sharp(inputBuffer).webp().toBuffer();
            zip.file(file.name.replace(/\.[^/.]+$/, "") + ".webp", webpBuffer);
          }

          resolve();
        } catch (error) {
          console.error("Conversion error:", error);
          reject(error);
        }
      };

      reader.readAsArrayBuffer(file);
    });

    convertPromises.push(convertPromise);
  }

  Promise.all(convertPromises)
    .then(() => {
      zip.generateAsync({ type: "blob" }).then(function (blob) {
        downloadFile(blob, "converted_images.zip");
      });
    })
    .catch((error) => {
      console.error("Error during conversion:", error);
    });
}

function downloadFile(blob, fileName) {
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}
