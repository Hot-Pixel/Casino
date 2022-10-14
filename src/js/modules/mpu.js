
const ANIMATION_DURATION = 200;
const ANIMATION_DELAY = 50;

function mpu(params) {
    if (typeof params === 'undefined') return;
    if (typeof params === 'string') openMpuUrl(params);
    if (typeof params === 'object') openMpuOptions(params);
}

function openMpuUrl(url) {
    if (!url) return;
    openMpuOptions({ url: url });
}

async function openMpuOptions(options) {
    let mpu = document.querySelector('.mpu') || getTemplate();
    
    if (!mpu) return;

    const defaults = {
        url: '',
        fullscreen: true,
        title: '',
        body: '',
    };
    const settings = Object.assign({}, defaults, options);

    if (settings.url) {
        fetchMpuContent(settings.url)
            .then(content => {
                const fetchedContent = document.createRange().createContextualFragment(content);
                document.querySelector('.mpu').querySelector('.mpu__content').replaceChildren(fetchedContent);;
            });
    } else {
        mpu.querySelector('.mpu__title').innerHTML = settings.title;
        mpu.querySelector('.mpu__body').innerHTML = settings.body; 
    }
    
    mpu.querySelector('.mpu__btn-close').addEventListener('click', closeMpu);

    document.body.classList.toggle('mpu-open', true);
    document.body.appendChild(mpu);
    setTimeout(() => {
        document.querySelector('.mpu').classList.add('mpu--open');
    }, ANIMATION_DELAY);
}

function getTemplate() {
    const mpuTpl = document.getElementById('mpu-tpl');
    if (!mpuTpl) return false;
    return mpuTpl.content.cloneNode(true);
}

function fetchMpuContent(url) {
    return fetch(url)
        .then(response => response.text())
}

function closeMpu() {
    const mpu = document.querySelector('.mpu');
    if (!mpu) return;

    document.querySelector('.mpu').classList.remove('mpu--open');
    setTimeout(() => {
        mpu.remove();
        document.body.classList.toggle('mpu-open', false);
    }, ANIMATION_DURATION);
}

function mpuDataTriggers() {
    const mpuOpenBtns = document.querySelectorAll('[data-mpu-url]');
    console.log(mpuOpenBtns);
    mpuOpenBtns.forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            mpu(e.currentTarget.dataset.mpuUrl);
        });
    });
}

export default mpu;
export { closeMpu, mpuDataTriggers };