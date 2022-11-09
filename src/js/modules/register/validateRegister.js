import { goTop } from "../scrollTo";
import Alert from '../alert';

export default function validateRegister() {
    const textInputs = document.querySelectorAll('.register__fieldset--text input');
    const selectInputs = document.querySelectorAll('.register__fieldset--select select');
    const checkInputs = document.querySelectorAll('.register__fieldset--check input');
    const form = document.querySelector('#register');
    const submitBtn = document.querySelector('.register__action--submit');
    const registerContent = document.querySelector('.register__content');
    let isValidatingStep = false;
    const DOCTYPE_DNINIE = 0;
    const DOCTYPE_PASSPORT = 1;
    let currentDoctype = DOCTYPE_DNINIE;

    function bindEvents() {
        textInputs.forEach(input => {
            input.addEventListener('blur', manageInputState);
            input.addEventListener('focus', manageInputState);
            input.addEventListener('invalid', manageInputError);
        });
        selectInputs.forEach(function (input) {
            input.addEventListener('input', manageInputState);
            input.addEventListener('invalid', manageInputError);
        });
        checkInputs.forEach(input => {
            input.addEventListener('input', manageInputState);
            input.addEventListener('invalid', manageInputError);
        });
        //form.addEventListener('submit', manageFormSubmit);
        submitBtn.addEventListener('click', manageFormSubmit);
    }

    function manageInputState(event) {
        const input = event.target;
        const parent = input.closest('.register__fieldset');

        switch (event.type) {
            case "input":
                parent.classList.add('register__fieldset--dirty');
                validateField(event.target);
                break;
            case "focus":
                parent.classList.add('register__fieldset--active');
                break;
            case "blur":
                parent.classList.add('register__fieldset--touched');
                parent.classList.remove('register__fieldset--active');
                validateField(event.target);
                break;
            case "change":
                validateField(event.target);
                break;
            default:
                break;
        }
    }

    function manageInputError(e) {
        const field = e.target;
        const errorWrapper = field.dataset.messagesTarget ?
            document.querySelector(field.dataset.messagesTarget)
            :
            field.closest('.register__fieldset').querySelector('.register__messages');
        if (!errorWrapper) return;

        let errorMessage = null;
        for (const validityType in field.validity) {
            if (field.validity[validityType]) {
                console.log(validityType)
                if (field.dataset[validityType]) {
                    errorMessage = field.dataset[validityType];
                }
            }
        }
        errorWrapper.innerHTML = errorMessage ? errorMessage : field.validationMessage;
    }

    async function manageFormSubmit(e) {
        e.preventDefault();
        const isValid = await validateStep(3);
        if (isValid) {
            submitForm();
        }
    }

    function submitForm() {
        setLoading(true);
        register()
            .then(async response => {
                if (response.redirected) {
                    window.location.href = response.url
                } else {
                    const data = await response.json();

                    if (data.fieldErrors == undefined) {
                        showErrors("general", data.errorMessage, 'nok');
                    }
                    for (var field in data.fieldErrors) {
                        displayInfo(field, data.fieldErrors[field], 'nok');
                    }
                }
            }).catch(error => {
                console.log(error);
                document.getElementById("registerLoader").style.display = "none";
            })
            .finally(() => setLoading(false));
        setLoading(false);
    }

    function showErrors(field, errors) {
        if (field === "general") {
            const alertMgr = Alert();
            alertMgr.add(errors[0], 'error');
            return;
        }
        const fieldEl = document.getElementById(field);
        const fieldParent = fieldEl.closest('.register__fieldset');
        const errorWrapper = fieldParent.querySelector('.register__messages');
        const errorStep = fieldEl.closest('.register__page').dataset.step;
        fieldParent.dataset.status = 'invalid';
        errorWrapper.innerHTML = errors[0];
        registerContent.dataset.currentStep = errorStep;
    }

    async function validateField(field) {
        switch (field.name) {

            case "e_mail":
                await validateEmail(field);
                break;

            case "nationalId":
                await validateNationalId(field);
                break;

            case "nationality":
                validateNationality(field);
                break;

            case "country":
                validateCountry(field);
                break;

            case "zipcode":
                validateZipcode(field);
                break;

            case "day":
            case "month":
            case "year":
                validateBirthday(field);
                break;

            case "phone":
                validatePhone(field);
                break;

            case "user":
                if (isValidatingStep) await validateUser(field);
                break;

            case "re_password":
                validatePasswordRepeat(field);
                break;

            default:
                break;
        }
        setFieldValidityClass(field);
        return field.validity.valid;
    }

    function setFieldValidityClass(input) {
        const inputGroup = input.closest('.register__fieldset');
        const groupInputs = inputGroup.querySelectorAll('input, select');
        let isGroupValid = true;
        groupInputs.forEach(function (input) {
            if (!input.checkValidity()) {
                isGroupValid = false;
            }
        });
        if (isGroupValid) {
            inputGroup.dataset.status = 'valid';
        } else {
            inputGroup.dataset.status = 'invalid';
        }
    }

    async function validateEmail(field) {
        console.log('validateEmail')
        field.setCustomValidity("");
        const value = field.value;
        if (!isValidatingStep || !field.validity.valid) {
            return;
        }

        const response = await checkIfEmailExists(field);

        if (response.responseStatus === "nok") {
            switch (response.errorMessage) {
                case "email already in use":
                    field.setCustomValidity("Este email ya está en uso");
                    break;
                case "Error validating request fields":
                    field.setCustomValidity(response.fieldErrors.email);
                    break;
            }
            return false;
        }
        return true;
    }

    function nie(value) {
        value = value.toUpperCase();
        if (!value.match('((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)')) {
            return false;
        }
        if (/^[T]{1}/.test(value)) {
            return (value[8] === /^[T]{1}[A-Z0-9]{8}$/.test(value));
        }
        if (/^[XYZ]{1}/.test(value)) {
            return (
                value[8] === "TRWAGMYFPDXBNJZSQVHLCKE".charAt(
                    value.replace('X', '0').replace('Y', '1').replace('Z', '2').substring(0, 8) % 23)
            );
        }
        return false;

    }

    function nif(dni) {
        const expresion_regular_dni = /^\d{8}[a-zA-Z]$/;

        if (expresion_regular_dni.test(dni) == true) {
            let numero = dni.substr(0, dni.length - 1);
            const letra = dni.substr(dni.length - 1, 1);
            numero = numero % 23;
            const letraEsperada = 'TRWAGMYFPDXBNJZSQVHLCKET'.substring(numero, numero + 1);
            if (letraEsperada != letra.toUpperCase()) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    function validateNieNif(dni) {
        if (currentDoctype === DOCTYPE_DNINIE) {
            if (!nif(dni) && !nie(dni)) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    async function validateNationalId(field) {
        field.setCustomValidity("");
        if (!validateNieNif(field.value)) {
            field.setCustomValidity("El DNI/NIE no es válido");
            return false;
        }
        if (isValidatingStep && field.validity.valid) {
            const exists = await checkIfDniExists(field);
            if (exists) {
                field.setCustomValidity(`Este DNI ya está registrado`);
                return false;
            }
        }

        return true;
    }

    function validateNationality(field) {
        checkDoctypeChange();
    }

    function validateCountry(field) {
        checkDoctypeChange();
        if (isValidatingStep) {
            toggleTaxState(field.value === '199');
        }
    }

    function checkDoctypeChange() {
        const country = document.querySelector('#country');
        const nationality = document.querySelector('#nationality');
        if (country.value !== '199' && nationality.value !== '199' && currentDoctype !== DOCTYPE_PASSPORT) {
            currentDoctype = DOCTYPE_PASSPORT;
            changeDoctype();
            console.log("changing to passport")
        } else if ((country.value === '199' || nationality.value === '199') && currentDoctype !== DOCTYPE_DNINIE) {
            currentDoctype = DOCTYPE_DNINIE;
            changeDoctype();
            console.log("changing to dni/nie")
        }
    }

    function changeDoctype() {
        const doctypeField = document.querySelector('#docType');
        const nationalIdField = document.querySelector('#nationalId');
        const nationalIdFieldset = nationalIdField.closest('.register__fieldset');
        const nationalIdLabel = nationalIdFieldset.querySelector('.register__label');
        doctypeField.value = currentDoctype;
        if (currentDoctype === DOCTYPE_DNINIE) {
            nationalIdLabel.innerHTML = 'Documento de identidad';
            nationalIdField.setAttribute('pattern', '[0-9]{8}[A-Z]');
            nationalIdField.setAttribute('placeholder', '12345678A');
            nationalIdField.setAttribute('data-pattern-mismatch', 'El formato del DNI/NIE no es correcto');
        } else {
            nationalIdLabel.innerHTML = 'Pasapoorte';
            nationalIdField.setAttribute('pattern', '(?!^0+$)[a-zA-Z0-9]{3,20}');
            nationalIdField.setAttribute('placeholder', 'Pasaporte');
            nationalIdField.setAttribute('data-pattern-mismatch', 'El formato del pasaporte no es correcto');
        }
    }

    function toggleTaxState(showField) {
        const tax_state = document.querySelector('#tax_state');
        const tax_stateParent = tax_state.closest('.register__fieldset');
        if (showField) {
            tax_state.value = "";
            tax_stateParent.classList.remove('d-none');
            return;
        }
        tax_state.value = 22;
        tax_stateParent.classList.add('d-none');
    }

    function validateZipcode(field) {
        if (isValidatingStep) return;

        if (field.dataset.value === field.value) return;
        field.dataset.value = field.value;

        const country = document.querySelector('#country');
        const countryCode = country.value === '199' ? 'ES' : 'AD';
        fetch(`https://data.opendatasoft.com/api/records/1.0/search/?dataset=geonames-postal-code%40public&q=&facet=country_code&facet=admin_name1&facet=admin_code1&facet=admin_name2&facet=postal_code&refine.country_code=${countryCode}&refine.postal_code=${field.value}`)
            .then(response => response.json())
            .then(data => fillLocationInputs(data, countryCode));
    }

    function fillLocationInputs(data, countryCode) {
        const city = document.querySelector('#city');
        const state = document.querySelector('#state');
        const jsonStates = JSON.parse(document.querySelector('#json-states').textContent);
        const citiesArray = data.records.map(record => record.fields.place_name);
        const statesArray = data.records.map(record => {
            if (countryCode === 'ES') {
                return record.fields.admin_name2;
            }
            return record.fields.admin_name1;
        });
        const cities = [...new Set(citiesArray)];
        const states = [...new Set(statesArray)];

        let cityOptions = '<option value="" disabled>Localidad</option>';
        let stateOptions = '<option value="" disabled>Província</option>';

        cities.forEach(city => {
            cityOptions += `<option value="${city}">${city}</option>`;
        });
        states.forEach(state => {
            const jsonState = jsonStates.find(jsonState => jsonState.name.toLowerCase().includes(state.toLowerCase()));
            stateOptions += `<option value="${jsonState.id}">${state}</option>`;
        });
        city.innerHTML = cityOptions;
        state.innerHTML = stateOptions;
    }

    function validateBirthday(field) {
        field.setCustomValidity("");
        const birthdayField = document.getElementById('birthday');
        const day = document.getElementById('day').value;
        const month = document.getElementById('month').value;
        const year = document.getElementById('year').value;

        if (!day || !month || !year) {
            return false;
        }

        const esFormatDate = `${day}/${month}/${year}`;
        const enFormatDate = `${year}/${month}/${day - 1}`;
        var years = new Date(new Date() - new Date(enFormatDate)).getFullYear() - 1970;
        if (years < 18) {
            field.setCustomValidity("Debes ser mayor de 18 años.");
            return false;
        }

        birthdayField.value = esFormatDate;
        return true;
    }

    function validatePhone(field) {
        if (!field.validity.valid) return;
        const phone = document.getElementById('phone');
        const phonearea = document.getElementById('phonearea');
        const phonenumber = document.getElementById('phonenumber');
        phonearea.value = phone.value.substring(0, 3);
        phonenumber.value = phone.value.substring(3);
        return true;
    }

    function validatePasswordRepeat(field) {
        field.setCustomValidity("");
        const password = document.getElementById('pwdField');
        if (password.value !== field.value) {
            field.setCustomValidity("Las contraseñas no coinciden");
            return false;
        }
        return true;
    }

    async function validateUser(field) {
        field.setCustomValidity("");
        const value = field.value;

        const isServerValidJson = await checkIfUserExists(field);
        if (isServerValidJson.responseStatus === "nok") {
            switch (isServerValidJson.errorMessage) {
                case "Error validating request fields":
                    field.setCustomValidity(`${isServerValidJson.fieldErrors.user}<br>Por ejemplo: <em>${isServerValidJson.proposedAlias.join("</em>, <em>")}</em>`);
                    break;
            }
            return false;
        }
        return true;
    }

    async function validateStep(step) {
        isValidatingStep = true;

        setLoading(true);

        const stepElm = document.querySelector(`.register__page[data-step="${step}"]`);
        stepElm.classList.add('register__page--validated');
        const elements = stepElm.querySelectorAll(`input, select`);
        let isValid = true;

        for (let i = 0; i < elements.length; i++) {
            const field = elements[i];
            if (["submit", "hidden", "button"].includes(field.type)) continue;

            const fieldIsValid = await validateField(field);
            if (!fieldIsValid) {
                isValid = false;
                goTop();
            }
        }

        setLoading(false);

        isValidatingStep = false;

        return isValid;
    }

    function setLoading(isLoading) {
        registerContent.classList.toggle('register__window--loading', isLoading);
    }

    function start() {
        bindEvents();
    }

    return {
        start,
        validateStep
    }
}