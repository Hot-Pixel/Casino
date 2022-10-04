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
const alert = Alert();

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
      alert.removeAll();
      const res = await handleLogin(nameEl.value, passEl.value);
      console.log(res)
    } catch (error) {
      alert.add(error, "error");
    } finally {
      setFormLoading(false);
    }
  });

// async function handleLogin(user, pass) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (user === pass) {
//         resolve('login ok');
//       }
//       reject('login error');
//     }, 1000);
//   })
// }

function setFormLoading(isLoading) {
  const submitTextEl = loginSubmitBtn.querySelector('span');
  loginSubmitBtn.classList.toggle('loading', isLoading);
  isLoading ? submitTextEl.innerText = "CARGANDO..." : submitTextEl.innerText = "ENTRAR";
}
