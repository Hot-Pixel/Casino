import ZenDesk from "../modules/zenDesk";
import marginHeader from "../modules/marginHeader";
import menuHeaderMobile from "../modules/menuHeaderMobile";
import Mpu from "../modules/mpu";
import userMenuMobile from "../modules/userMenuMobile";

menuHeaderMobile();
userMenuMobile();

Mpu().mpuDataTriggers();
ZenDesk().start();

window.Mpu = Mpu;
window.mpu = Mpu().mpu;
window.closeMpu = Mpu().closeMpu;

window.addEventListener("load", () => {
    marginHeader();
});