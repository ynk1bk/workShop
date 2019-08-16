'use strict';

// checkboxx
function toggleCheckbox() {
  const checkbox = document.querySelectorAll(".filter-check_checkbox");

  checkbox.forEach(function (elem) {
    elem.addEventListener('change', function () {
      if (this.checked) {
        this.nextElementSibling.classList.add('checked');
        console.log("cheked");
      } else {
        this.nextElementSibling.classList.remove('checked');
        console.log("no-cheked");
      }
    });
  });

}

//end chekckbox
// basket
function toggleBasket() {
  const btnCart = document.getElementById('cart');
  const modalCart = document.querySelector('.cart');
  const closeBtn = document.querySelector('.cart-close');

  btnCart.addEventListener('click', () => {
    modalCart.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });

  closeBtn.addEventListener('click', () => {
    modalCart.style.display = 'none';
    document.body.style.overflow = '';
  });
}

//end basket

//work with product in basket
function addCart() {
  const cards = document.querySelectorAll('.goods .card'),
    cartWrapper = document.querySelector('.cart-wrapper'),
    cartEmpty = document.getElementById('cart-empty'),
    countProducts = document.querySelector('.counter');

  cards.forEach((card) => {
    const btn = card.querySelector('button');
    btn.addEventListener('click', () => {
      const cardClone = card.cloneNode(true);
      cartWrapper.appendChild(cardClone);
      showData();

      const removeBtn = cardClone.querySelector('.btn');
      removeBtn.textContent = "Удалить из корзины";
      removeBtn.addEventListener('click', () => {
        cardClone.remove();
        showData();
      });
    });
  });

  function showData() {
    const cardsCart = cartWrapper.querySelectorAll('.card'),
      cardsPrice = cartWrapper.querySelectorAll('.card-price'),
      cardTotal = document.querySelector('.cart-total span');

    countProducts.textContent = cardsCart.length;

    let sum = 0;
    cardsPrice.forEach((cardPrice) => {
      sum += parseFloat(cardPrice.textContent);
    });

    cardTotal.textContent = sum;

    if (cardsCart.length !== 0) {
      cartEmpty.remove();
    } else {
      cartWrapper.appendChild(cartEmpty);
    }
  }
}

//end work with product in basket

//sales filter
function actionPage() {
  const cards = document.querySelectorAll('.goods .card'),
    discountCheckbox = document.querySelector('#discount-checkbox'),
    min = document.getElementById('min'),
    max = document.getElementById('max'),
    search = document.querySelector('.search-wrapper_input'),
    searchBtn = document.querySelector('.search-btn'),
    goods = document.querySelector('.goods');
   

  discountCheckbox.addEventListener('click', () => {
    cards.forEach((card) => {
      if (discountCheckbox.checked) {
        if (!card.querySelector('.card-sale')) {
          card.parentNode.remove();
        }
      } else {
        goods.appendChild(card.parentNode);
      }
    });

  });

  function filterPrice() {
    cards.forEach((card) => {
      const cardPrice = card.querySelector('.card-price');
      const price = parseFloat(cardPrice.textContent);
      if (price < parseFloat(min.value) || price > parseFloat(max.value)) {
        card.parentNode.remove();
      } else {
        goods.appendChild(card.parentNode);
      }
    });
  }
  min.addEventListener('change', filterPrice);
  max.addEventListener('change', filterPrice);

  searchBtn.addEventListener('click', () => {
    const searchText = new RegExp(search.value.trim(), 'i');
    cards.forEach((card) => {
      const title = card.querySelector('.card-title');
      if (!searchText.test(title.textContent)) {
        card.parentNode.style.display = 'none';
      } else {
        card.parentNode.style.display = '';
      }
    });

    search.value = '';
  });
}
//end sales filter
toggleCheckbox();
toggleBasket();
addCart();
actionPage();