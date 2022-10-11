
function mpu(params) {
    if (typeof params === 'undefined') return;
    if (typeof params === 'string') openMpuUrl(params);
    if (typeof params === 'object') openMpuOptions(params);
}

function openMpuUrl(url) {
    if (!url) return;
    openMpuOptions({ url: url });
}

function openMpuOptions(options) {
    const mpuTpl = document.getElementById('mpu-tpl');
    if (!mpuTpl) return;
    const mpu = mpuTpl.content.cloneNode(true);

    const defaults = {
        url: '',
        fullscreen: true,
        title: '',
        body: '',
    };
    const settings = Object.assign({}, defaults, options);

    if (settings.url) {
        // open mpu with url
        return;
    }

    mpu.querySelector('.mpu__title').innerHTML = settings.title;
    mpu.querySelector('.mpu__body').innerHTML = settings.body;
    mpu.querySelector('.mpu__btn-close').addEventListener('click', closeMpu);

    document.body.classList.toggle('mpu-open', true);
    document.body.appendChild(mpu);
}

function closeMpu() {
    const mpu = document.querySelector('.mpu');
    if (!mpu) return;
    document.body.classList.toggle('mpu-open', false);
    mpu.remove();
}

export default mpu;
export { closeMpu };