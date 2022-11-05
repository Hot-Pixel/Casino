import { createPopper } from "@popperjs/core/dist/esm";

class DemoBar {
    infoBtn = null;
    infoTooltip = null;
    demoBarElm = null;
    infoIsActive = false;
    tooltipInstance = null;

    constructor() {
        this.init();
    }

    init() {
        this.queryElements();
        this.bindEvents();
    }

    queryElements() {
        this.demoBarElm = document.querySelector('.demo-bar');
        this.infoBtn = document.querySelector('.demo-bar__info-btn');
        this.infoTooltip = document.querySelector('.demo-bar__tooltip');
    }

    bindEvents() {
        if (this.infoBtn) {
            this.createTooltip();
            this.infoBtn.addEventListener('click', () => {
                this.toggleInfo();
            });
        }
    }

    createTooltip() {
        this.tooltipInstance = createPopper(this.infoBtn, this.infoTooltip, {
            modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, 23],
                  },
                },
              ],
        });
    }

    toggleInfo() {
        if(this.infoIsActive) {
            this.infoTooltip.classList.remove('active');
        } else {
            this.infoTooltip.classList.add('active');
            this.tooltipInstance.update();
        }
        this.infoIsActive = !this.infoIsActive;
    }

}

export default DemoBar;