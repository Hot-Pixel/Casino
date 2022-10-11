import marginHeader from "../modules/marginHeader";
import menuHeaderMobile from "../modules/menuHeaderMobile";
import mpu, { closeMpu } from "../modules/mpu";
import userMenuMobile from "../modules/userMenuMobile";

marginHeader();
menuHeaderMobile();
userMenuMobile();

export { mpu, closeMpu }