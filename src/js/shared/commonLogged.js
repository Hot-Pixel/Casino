import accordionDeposit from "../modules/accordionDeposit";
import popUpSaldo from "../modules/popUpBalance";
import Session from "../modules/session";

popUpSaldo();

window.Session = Session;
window.accordionDeposit = accordionDeposit;