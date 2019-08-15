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
       cartEmpty.remove(); 
       countProducts.textContent = showData();      
    });
});

function showData(){
    const cardsCart = cartWrapper.querySelectorAll('.card');
    return cardsCart.length;
}

//end work with product in basket