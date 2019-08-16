'use strict';

// checkboxx

 const checkbox = document.querySelectorAll(".filter-check_checkbox");

    checkbox.forEach(function(elem){
        elem.addEventListener('change',function() {
            if(this.checked){
                this.nextElementSibling.classList.add('checked');
                console.log("cheked");
            } else{
                this.nextElementSibling.classList.remove('checked');
                console.log("no-cheked");
            }
        });
    });



//end chekckbox
// basket

const btnCart = document.getElementById('cart');
const modalCart = document.querySelector('.cart');
const closeBtn = document.querySelector('.cart-close');

btnCart.addEventListener('click', ()=>{
    modalCart.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', ()=>{
    modalCart.style.display = 'none';
    document.body.style.overflow = '';
});

//end basket

//work with product in basket

const cards = document.querySelectorAll('.goods .card'),
cartWrapper = document.querySelector('.cart-wrapper'),
cartEmpty = document.getElementById('cart-empty'),
countProducts = document.querySelector('.counter');

cards.forEach((card)=>{
    const btn = card.querySelector('button');
    btn.addEventListener('click',()=>{
       const cardClone = card.cloneNode(true); 
       cartWrapper.appendChild(cardClone);  
       showData();      

       const removeBtn = cardClone.querySelector('.btn');
       removeBtn.textContent="Удалить из корзины";
        removeBtn.addEventListener('click',()=>{
            cardClone.remove();
            showData();  
        });
    });
});

function showData(){
    const cardsCart = cartWrapper.querySelectorAll('.card'),
    cardsPrice = cartWrapper.querySelectorAll('.card-price'), 
    cardTotal = document.querySelector('.cart-total span');

    countProducts.textContent = cardsCart.length;

    let sum = 0;
    cardsPrice.forEach((cardPrice)=>{
       sum += parseFloat(cardPrice.textContent);
    });

    cardTotal.textContent = sum;

    if(cardsCart.length !== 0){cartEmpty.remove();} 
    else{ cartWrapper.appendChild(cartEmpty); }
}

//end work with product in basket