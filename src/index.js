'use strict';

// checkboxx
function toggleCheckbox() {
  const checkbox = document.querySelectorAll(".filter-check_checkbox");

  checkbox.forEach(function (elem) {
    elem.addEventListener('change', function () {
      if (this.checked) {
        this.nextElementSibling.classList.add('checked');
      } else {
        this.nextElementSibling.classList.remove('checked');
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

  discountCheckbox.addEventListener('click', filter);
  min.addEventListener('change', filter);
  max.addEventListener('change', filter);

  function filter() {
    cards.forEach((card) => {
      const cardPrice = card.querySelector('.card-price');
      const price = parseFloat(cardPrice.textContent);
      const discount = card.querySelector('.card-sale');

      if (price < parseFloat(min.value) || price > parseFloat(max.value)) {
        card.parentNode.remove();
      } else if (discountCheckbox.checked && !discount) {
        card.parentNode.remove();
      } else {
        goods.appendChild(card.parentNode);
      }

    });
  }

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

// get data from server

function getData() {
  const goodsWrapper = document.querySelector('.goods');

  return fetch('../db/db.json')
    .then((res)=>{
      if(res.ok){ return res.json();}else{throw new Error(res.status);}
    })
    .then((data)=>{
      return data;      
    })
    .catch((err)=>{
      console.log(err);
      goodsWrapper.innerHTML = '<div style="color:red"> Упс что-то пошло не так!!!.</div>';
    });
    
}
//вывод карточки товара
function renderCards(data){
  const goodsWrapper = document.querySelector('.goods');
  data.goods.forEach((good)=>{
    const card = document.createElement('div');
    card.className='col-12 col-md-6 col-lg-4 col-xl-3';
    card.innerHTML = `
    <div class="card" data-category = "${good.category}">
      ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
      <div class="card-img-wrapper">
        <span class="card-img-top"
          style="background-image: url('${good.img}')"></span>
        </div>
        <div class="card-body justify-content-between">
          <div class="card-price">${good.price} </div>
          <h5 class="card-title">${good.title}</h5>
          <button class="btn btn-primary">В корзину</button>
        </div>
      </div>`;
    goodsWrapper.appendChild(card);
  });
}

//en get data from server
function renderCatalog(){
  const cards = document.querySelectorAll('.goods .card');
  const categories = new Set();
  const cataloList = document.querySelector('.catalog-list');
  const catalogBtn = document.querySelector('.catalog-button');
  const catalogWrapper = document.querySelector('.catalog');

  cards.forEach((card)=>{    
    categories.add(card.dataset.category);   
  });
  categories.forEach((item)=>{
    const li = document.createElement('li');
    li.textContent= item;
    cataloList.appendChild(li);
  });

  catalogBtn.addEventListener('click',(event)=>{
    if(!catalogWrapper.style.display){catalogWrapper.style.display = "block";}
    else{catalogWrapper.style.display = "";}
    if(event.target.tagName === 'LI'){
      cards.forEach((card)=>{
        if(card.dataset.category !== event.target.textContent){
          card.parentNode.style.display = 'none';
        }else {
          card.parentNode.style.display = 'flex';
        }

      });
    }
  });
 
}

getData()
.then((data)=>{
  renderCards(data);
  toggleCheckbox();
  toggleBasket();
  addCart();
  actionPage();
  renderCatalog();
}).catch();

