/* created objects, which placed in big object */

const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 400,
        thing: 0,
        get Summ() {
            return this.price * this.thing
        },
        get Kcall() {
            return this.kcall * this.thing
        }
    },
    freshBurger: {
        name: 'Гамбургер Fresh',
        price: 20500,
        kcall: 500,
        thing: 0,
        get Summ() {
            return this.price * this.thing
        },
        get Kcall() {
            return this.kcall * this.thing
        }
    },
    freshCombo: {
        name: 'Fresh Combo',
        price: 31900,
        kcall: 700,
        thing: 0,
        get Summ() {
            return this.price * this.thing
        },
        get Kcall() {
            return this.kcall * this.thing
        }
    }
}

const extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной Майонез',
        price: 500,
        kcall: 50
    },
    lettuce: {
        name: 'Салатный Лист',
        price: 300,
        kcall: 10
    },
    cheese: {
        name: 'Сыр',
        price: 400,
        kcall: 30
    }
}

const btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
    checkExtraProduct = document.querySelectorAll('.main__product-checkbox'),
    addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptOut = receipt.querySelector('.receipt__window-out'),
    receiptWindow = receipt.querySelector('.receipt__window'),
    btnReceipt = receipt.querySelector('.receipt__window-btn');


for (let i = 0; i < btnPlusOrMinus.length; i++) {
    const btnElement = btnPlusOrMinus[i];
    btnElement.addEventListener('click', function () {
        /* console.log(this) */
        plusOrMinus(this)
    })

}

function plusOrMinus(el) {
    let parentId = el.closest('.main__product').getAttribute('id')
    let out = el.closest('.main__product').querySelector('.main__product-num')
    let price = el.closest('.main__product').querySelector('.main__product-price span')
    let kcall = el.closest('.main__product').querySelector('.main__product-call span')
    if (el.getAttribute('data-symbol') == '+' && product[parentId].thing < 10) {
        product[parentId].thing++
    } else if (el.getAttribute('data-symbol') == '-' && product[parentId].thing > 0) {
        product[parentId].thing--
    }
    out.innerHTML = product[parentId].thing
    price.innerHTML = product[parentId].Summ
    kcall.innerHTML = product[parentId].Kcall
}

for (let i = 0; i < checkExtraProduct.length; i++) {
    const exP = checkExtraProduct[i];
    exP.addEventListener('click', function () {
        addExtraProduct(this)
    })
}

function addExtraProduct(el) {
    let parentId = el.closest('.main__product').getAttribute('id')
    let price = el.closest('.main__product').querySelector('.main__product-price span')
    let kcall = el.closest('.main__product').querySelector('.main__product-call span')
    let elAttr = el.getAttribute('data-extra')

    product[parentId][elAttr] = el.checked

    if (product[parentId][elAttr] == true) {
        product[parentId].price = product[parentId].price + extraProduct[elAttr].price
    } else {
        product[parentId].price = product[parentId].price - extraProduct[elAttr].price
    }

    if (product[parentId][elAttr] == true) {
        product[parentId].kcall = product[parentId].kcall + extraProduct[elAttr].kcall
    } else {
        product[parentId].kcall = product[parentId].kcall - extraProduct[elAttr].kcall
    }

    kcall.innerHTML = product[parentId].Kcall
    price.innerHTML = product[parentId].Summ
}

let arrProduct = [],
    totalName = '',
    totalPrice = 0,
    totalKcall = 0;

addCart.addEventListener('click', function (e) {
    e.preventDefault()
    for (const key in product) {
        const productObj = product[key]
        if (productObj.thing > 0) {
            arrProduct.push(productObj)
            for (const infokey in productObj) {
                if (productObj[infokey] === true) {
                    productObj.name += '\n' + extraProduct[infokey].name

                }
            }
        }
        productObj.price = productObj.Summ
        productObj.kcall = productObj.Kcall
        /* console.log(arrProduct) */
    }

    for (let i = 0; i < arrProduct.length; i++) {
        const el = arrProduct[i];
        totalPrice += el.price
        totalKcall += el.kcall
        totalName += '\n' + el.name + '\n'
    }

    /* console.log(totalPrice)
    console.log(totalKcall)
    console.log(totalName) */

    receiptOut.innerHTML = `Вы купили:  \n Бургеры ${totalName}  \n Каллорийность ${totalKcall} \n Общая Стоимость ${totalPrice} сум`;
    receipt.style.display = 'flex';
    setTimeout(() => {
        receipt.style.opacity = 1;
    }, 100)
    setTimeout(() => {
        receiptWindow.style.top = 0;
    }, 200)
    btnReceipt.addEventListener('click', function(){
        location.reload()
    })
})