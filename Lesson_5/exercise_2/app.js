// получаем все кнопки
const buttons = document.querySelectorAll("button");
console.log(buttons);

// для каждой кнопки назначаем событие
buttons.forEach(function (button) {
    button.addEventListener("click", function (event) {
        hendleClick(event);
    });
});

function hendleClick(clickedButtonEvent) {
// получаем родителя
  const cardNode = clickedButtonEvent.target.parentNode;

  const card = {
      wrap: cardNode,
      img: cardNode.querySelector("img"),
      productName: cardNode.querySelector("h3"),
      button: cardNode.querySelector("button"),
      text: cardNode.querySelector("p"),
  };

  const textOnButton = card.button.innerText;
  if (textOnButton === "Подробнее"){
      showMoreText(card);
  } else if (textOnButton === "Отмена"){
      hideMoreText(card);
  }
}


function showMoreText(card) {
    card.img.style.display = "none";
    card.text.style.display = "block";
    card.button.innerText = "Отмена";


};
function hideMoreText(card) {
    card.img.style.display = "block";
    card.text.style.display = "none";
    card.button.innerText = "Подробнее";

}