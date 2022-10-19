const myForm = document.querySelector('#upload-attachment');
const fileInput = document.querySelector('#file');
const fileNameEl = document.querySelector('.file__name');

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    fileNameEl.textContent = file.name;
});