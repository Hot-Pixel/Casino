import accordionDeposit from "../modules/accordionDeposit";
import deposit from "../modules/deposit";
import popUpSaldo from "../modules/popUpBalance";
import Session from "../modules/session";

popUpSaldo();
deposit();

window.Session = Session;
window.accordionDeposit = accordionDeposit;