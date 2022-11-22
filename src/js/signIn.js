import JustValidate from "just-validate";
import Alert from '../js/modules/alert';

const recoverBtn = document.querySelector(".login__recoverBtn");
const loginBlocks = document.querySelectorAll(".login__block");
const loginSignIn = document.querySelector(".login__signIn");
const loginSubmitBtn = document.querySelector(".login__submit");
const loginRecover = document.querySelector(".login__recover");

recoverBtn.addEventListener("click", () => {
  loginBlocks.forEach((block) => {
    block.classList.remove("active");
  });
  loginRecover.classList.add("active");
});

const nameEl = document.getElementById('user');
const passEl = document.getElementById('password');
const alertMgr = Alert();

const validation = new JustValidate(".login__form", {
  errorFieldCssClass: "is-invalid",
  errorFieldStyle: {
    border: '1px solid #E99C00',
  },
  errorLabelCssClass: 'is-label-invalid',
  errorLabelStyle: {
    color: '#E99C00',
    fontSize: '12px',
    marginTop: '10px'
  },
});

validation
  .addField("#user", [
    {
      rule: "required",
      errorMessage: "Este campo es obligatorio",
    },
  ])
  .addField("#password", [
    {
      rule: "required",
      errorMessage: "Este campo es obligatorio",
    },
  ])
  .onSuccess(async () => {
    try {
      setFormLoading(true);
      alertMgr.removeAll();
      await handleLogin(nameEl.value, passEl.value);
    } catch (error) {
      alertMgr.add(error, "error");
      setFormLoading(false);
    }
  });

function setFormLoading(isLoading) {
  loginSubmitBtn.classList.toggle('btn--loading', isLoading);
}