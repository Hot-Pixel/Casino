import historyNavBar from "./modules/historyNavBar.js";
import loading from "./modules/loading.js";

loading();

function initSupportForm() {
  const theForm = document.querySelector("#supportForm")
  const alertMgr = Alert();

  const sendMail = async () => {
    const response = await fetch("https://api.casinobarcelona.es/mail/support/send", {
      method: "post",
      body: new FormData(theForm),
    })
    if (response.ok) {
      alertMgr.add("Consulta enviada", "success")
    } else {
      alertMgr.add("Algo ha salido mal, prueba mas tarde o abre el chat", "error")
    }
  }

  const submitForm = (e) => {
    e.preventDefault();
    sendMail();
  }

  theForm.onsubmit = submitForm;
}

document.addEventListener('DOMContentLoaded', () => {
  historyNavBar();
  initSupportForm();
})