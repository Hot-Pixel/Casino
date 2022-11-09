function Alert(options = {}) { 
    const defaultOptions = {
        wrapperSelector: '.alert__wrapper',
        itemTemplate: '<div class="alert alert--{type} alert--{closable}" data-index="{index}">{message}</div>'
    };

    options = Object.assign({}, defaultOptions, options);
    const wrapperEl = document.querySelector(options.wrapperSelector);
    let alertIndex = 0;

    function add(message, type = 'warning', closable = true) {
        const alertStr = options.itemTemplate
            .replace("{type}", type)
            .replace("{closable}", closable ? "closable" : "fixed")
            .replace("{index}", alertIndex)
            .replace("{message}", message)
        const alertEl = stringToElement(alertStr);
        if(closable) {
            const imageX = document.createElement("img");            
            imageX.src = "https://cbar.netlify.app/img/icons/icon-close-white.svg";
            imageX.classList.add("alert--closable__button");
            alertEl.appendChild(imageX);
            imageX.addEventListener("click", () => remove(alertEl.dataset.index))           
        }
        wrapperEl.append(alertEl);
        alertIndex++;
    }

    function remove(index) {
        const alert = wrapperEl.querySelector(`[data-index="${index}"]`);
        alert.remove();
    }

    function removeAll() {
        wrapperEl.innerHTML = "";
    }

    function stringToElement(str) {
        const tmp = document.createElement('div');
        tmp.innerHTML = str;
        return tmp.firstChild;
    }

    return {
        add,
        remove,
        removeAll
    };
}

export default Alert;
