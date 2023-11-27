const sharp = require('sharp');
const startConvertBtn = document.querySelector('.js-startConvert');

startConvertBtn.addEventListener('click', () => {
    convertToWebP();
})


async function convertToWebP() {
    const fileInput = document.querySelector('.js-file');
    const file = fileInput.files[0];

    if (!file) {
      alert('Please select a PNG file.');
      return;
    }

    const reader = new FileReader();

    reader.onload = async function (event) {
      const inputBuffer = new Uint8Array(event.target.result);
      

      try {
        const webpBuffer = await sharp(inputBuffer).webp().toBuffer();
        downloadFile(webpBuffer, 'converted.webp');
      } catch (error) {
        console.error('Conversion error:', error);
      }
    };

    reader.readAsArrayBuffer(file);
  }


  function downloadFile(buffer, fileName) {
    const blob = new Blob([buffer]);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }

