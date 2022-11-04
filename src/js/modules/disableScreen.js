function disableScreen({ title, message, ctaText = null, ctaLink = null }) {
  document.body.classList.add('screen--disabled');
  const screens = document.querySelectorAll('.screen');
  const screensWrapper = document.querySelector('.screens');
  
  const disabledScreen = document.createElement('div');
  disabledScreen.classList.add('screen');
  disabledScreen.classList.add('screen--disabled');

  let cta = '';
  if(ctaText && ctaLink) {
    cta = `<div class="screen__actions"><a href="${ctaLink}" class="btn__red">${ctaText}</a></div>`;;
  }

  disabledScreen.innerHTML = `
      <h3 class="screen__title">${title}</h3>
      <p class="screen__message">${message}</p>
      ${cta}
  `;
  screens.forEach(screen => screen.remove());
  screensWrapper.prepend(disabledScreen);
}

export default disableScreen;