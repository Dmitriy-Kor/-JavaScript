"use strict";
let slider = document.querySelector(".slider");

// создаем иконку загрузки
let loadIcon = document.createElement("i");
loadIcon.classList.add("fas","fa-compact-disc","fa-spin");
slider.insertAdjacentElement("afterbegin", loadIcon);

// создаем левую стрелку управления
let leftArrow = document.createElement("i");
leftArrow .classList.add("fas","fa-chevron-circle-left", "slider-leftArrow");
slider.insertAdjacentElement("beforeend", leftArrow);

// создаем правую стрелку управления
let rightArrow = document.createElement("i");
rightArrow.classList.add("fas","fa-chevron-circle-right", "slider-rightArrow");
slider.insertAdjacentElement("beforeend", rightArrow);

// ждем когда все загрузится
window.addEventListener("load", function () {
    // по щелчку на левую стрелочку меняем картинку
    leftArrow.addEventListener("click", function () {
       images.setNextLeftImage();
    });
    // по щелчку на правую стрелочку меняем картинку
    rightArrow.addEventListener("click", function () {
        images.setNextRightimage();

    })
    //  инициализация слайдера
    images.init();
    //скрываем иконку загрузки
    loadIcon.style.display = "none";
});
// обЪект слайдера

let images = {
    // номер текущего изображения
    currentIndex: 0,
    // элементы слайдов
    slides: [],
    // получаем все слайды и показываем первый слайд
    init(){
        this.slides = document.querySelectorAll(".slider-item");
        this.showImageWithCurrentIdx();
        this.checkSizeSlider();
    },
    // проверяем размер и задаем слайдера
    checkSizeSlider(){
        let width = slider.getAttribute("data-width");
        let height = slider.getAttribute("data-height");
        if (width !== null && width !==""){
            slider.style.width = width;
        }
        if (height !== null && width !==""){
            slider.style.height = height;
        }
    },

    // показываем нужный слайд
    showImageWithCurrentIdx(){
        this.slides[this.currentIndex].classList.remove("hidden-slide");
    },

    // скрываем слайды
    hideVisibleImage(){
        this.slides.forEach(function (slide) {
            if (!slide.classList.contains("hidden-slide")){
                slide.classList.add("hidden-slide");
            }
        })
    },
    // переключаемся на предыдущее изображение
    setNextLeftImage(){
         this.hideVisibleImage();
         if (this.currentIndex == 0){
            this.currentIndex = this.slides.length - 1;
         } else {
             this.currentIndex--;
         }
         const currentSlide = this.slides[this.currentIndex];
         currentSlide.classList.add("fade-in-left");
         currentSlide.classList.remove("hidden-slide");
         setTimeout(() => {
             currentSlide.classList.remove("fade-in-left");
         },600);
    },
    setNextRightimage(){
        this.hideVisibleImage();
        if (this.currentIndex == this.slides.length - 1){
            this.currentIndex = 0;
        } else {
            this.currentIndex++;
        }
        const currentSlide = this.slides[this.currentIndex];
        currentSlide.classList.add("fade-in-right");
        currentSlide.classList.remove("hidden-slide");
        setTimeout(() => {
            currentSlide.classList.remove("fade-in-right");
        },600);
    },
};