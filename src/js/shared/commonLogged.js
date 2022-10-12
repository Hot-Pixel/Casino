import accordionDeposit from "../modules/accordionDeposit";
import depositAmount from "../modules/depositAmount";
import depositCopy from "../modules/depositCopy";
import depositSteps from "../modules/depositSteps";
import popUpSaldo from "../modules/popUpBalance";
import Session from "../modules/session";

accordionDeposit();
popUpSaldo();
depositSteps();
depositAmount();
depositCopy();

export {
    Session
};