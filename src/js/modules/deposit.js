function deposit() {
    const depositOpenBtns = document.querySelectorAll(".deposit__openBtn");
    depositOpenBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            mpu('/mpu-deposit');
        });
    });
}

export default deposit;