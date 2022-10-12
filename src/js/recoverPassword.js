import JustValidate from "just-validate";

function recoverPassword() {

  const loginRecover = document.querySelector(".login__recover");
  if (loginRecover) return;

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
    .addField("#email", [
      {
        rule: "email",
        errorMessage: "Introduce un email válido",
      },
    ])
    .onSuccess(e => {
      e.target.submit();
    });
}

recoverPassword();