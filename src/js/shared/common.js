import marginHeader from "../modules/marginHeader";
import menuHeaderMobile from "../modules/menuHeaderMobile";
import mpu, { closeMpu } from "../modules/mpu";
import userMenuMobile from "../modules/userMenuMobile";

marginHeader();
menuHeaderMobile();
userMenuMobile();

const depositOpenBtns = document.querySelectorAll(".deposit__openBtn");
depositOpenBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const textMpuOptions = {
            title: "Títol de prova",
            body: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl sit amet aliquam lacinia, nisl nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl sit amet aliquam lacinia, nisl nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl sit amet aliquam lacinia, nisl nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl sit amet aliquam lacinia, nisl nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl.</p>
            `,
        };
        mpu('/mpu-deposit');
        //mpu(textMpuOptions);
    });
});

window.mpu = mpu;
window.closeMpu = closeMpu;