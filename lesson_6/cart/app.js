// получаем все кнопки
let basketBtns = document.querySelectorAll(".btn");
console.log(basketBtns);

basketBtns.forEach(function (btns) {
    btns.addEventListener("click", function (event) {
        let id = event.srcElement.dataset.id;
        let price = event.srcElement.dataset.price;
        let name = event.srcElement.dataset.name;
        console.log(id);
        console.log(price);
        console.log(name);
        let productInfo = {
            id:id,
            price:price,
            name:name
        }
        console.log(productInfo);
        basket.addProduct(productInfo);
    });
});

let basket = {
    products:{},

    /**
     * метод добавляет продукт в корзину
     * @param {{id: string, price: string, name: string}} product объект
     */
    addProduct(product){
      this.addProductToObject(product); //добовляет продукт
      this.renderProductInBasket(product); // записывает в корзину
      this.renderTotalSum(); // считает сумму
      this.addRemoveBtnsListeners(); // удаляет
    },
    /**
     * Метод добавляет продукт в объект с продуктами.
     * @param product
     */
    addProductToObject(product){
        if (this.products[product.id] == undefined){
            this.products[product.id] = {
                price: product.price,
                name: product.name,
                count: 1
            }
        } else {
            this.products[product.id].count++;
        }
    },
    /**
     * Отрисовывает продукт в корзине + проверка
     * @param product
     */
    renderProductInBasket(product){
        let productExist = document.querySelector(`.productCount[data-id="${product.id}"]`);
        if (productExist){
            productExist.textContent++;
            return;

        }
        let productRow = `
            <tr>
                <th scope="row">${product.id}</th>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td class="productCount" data-id="${product.id}">1</td>
                <td><i class="fas fa-trash-alt productRemoveBtn" data-id="${product.id}"></i></td>
            </tr>
        `;
        let tbody = document.querySelector("tbody");
        tbody.insertAdjacentHTML("beforeend", productRow)
    },
    renderTotalSum(){
        document.querySelector(".total").textContent = this.getTotalSum();
    },
    /**
     * считает стоимость всех продуктов в корзине
     * @return {number}
     */
    getTotalSum(){
        let sum = 0;
        for (let key in this.products){
            sum += this.products[key].price * this.products[key].count;
        }
        return sum;
    },
    /**
     * Метод удаляет продукт из объекта продуктов, а также из корзины на странице.
     * */
    removeProduct(event){
        let id = event.srcElement.dataset.id;
        this.removeProductFromObject(id);
        this.removeProductfromBasket(id);

    },
    /**
     * Метод удаляет продукт из объекта с продуктами.
     * @param
     */
    removeProductFromObject(id){
        if (this.products[id].count == 1){
            delete this .products[id];
        } else {
            this.products[id].count--;
        }
    },
    /**
     * Метод удаляет товар из корзины.
     * @param
     */
    removeProductfromBasket(id){
        let countTd = document.querySelector(`.productCount[data-id="${id}"]`);
        if (countTd.textContent == 1){
            countTd.parentNode.remove();
        } else {
            countTd.textContent--;
        }
    },


    removeProductListener(event){
        basket.removeProduct(event);
        basket.renderTotalSum();
    },


    /**
     * Добавляем слушателей события клика по кнопкам удалить.
     */
    addRemoveBtnsListeners(){

        // let btnsRemove = document.querySelectorAll(".productRemoveBtn");
        // btnsRemove.forEach(function (buttns){
        //     buttns.addEventListener("click",this.removeProductListener);
        // });

        // а через .forEach назначить событие нельзя?

        let btnsRemove = document.querySelectorAll(".productRemoveBtn");
        for (let i = 0; i < btnsRemove.length; i++){
            btnsRemove[i].addEventListener("click", this.removeProductListener);
        }
    },
};