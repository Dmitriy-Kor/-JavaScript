// получаю элементы по id
const btn_open = document.getElementById("btn_open");
const btn_close = document.getElementById("btn_close");
const modal_window = document.getElementById("modal");

/**
 * Фунция открывет модальное окно меняя свойство display.
 * добавляет классы для анимации и удаляет лишние.
 */
function openByClick() {
  modal_window.style.display = "flex";
  modal_window.classList.add("animated","bounceInDown");
  modal_window.classList.remove("bounceOutUp");

};
/**
 * Фунция скрывает модальное окно меняя свойство display.
 * добавляет классы для анимации и удаляет лишние.
 */
function closeByClick() {
    modal_window.classList.remove("bounceInDown");
    modal_window.classList.add("bounceOutUp");
    setTimeout(function () {
        modal_window.style.display = "none";
    },1000);
};

// назначаем на кноки обработчик события
btn_open.addEventListener("click", openByClick);
btn_close.addEventListener("click", closeByClick);