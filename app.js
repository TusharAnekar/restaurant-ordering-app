import { menuArray } from './data.js'
document.getElementById('order-container').classList.add('hidden')

let arrayOfYourOrder = []

const payBtn = document.getElementById('pay-btn')
const formPayment = document.getElementById('form-payment')

formPayment.addEventListener('submit', function (e) {
    e.preventDefault()

    const customerInfo = new FormData(formPayment)
    const name = customerInfo.get('name')

    document.getElementById("payment-modal").classList.add('hidden')
    document.getElementById('order-container').innerHTML = `
    <div class='message-container'>
        <p class="order-message">Your order is on its way ${name}!</p>
        <p class="order-message">Enjoy your Food!</p>
    </div>
    `
})

document.addEventListener('click', function (e) {
    if (e.target.id) {
        getOrder(e.target.id)
    }
    else if (e.target.dataset.delete) {
        handleDeleteButton(e.target.dataset.delete)
    }
    else if (e.target.dataset.completeorder === 'complete-order-btn') {
        handleCompleteOrder()
    }
    else if (e.target.dataset.close === 'close-btn') {
        handleCloseBtn()
    }
})

function handleCloseBtn() {
    document.getElementById("payment-modal").classList.add('hidden')
}

function handleCompleteOrder() {
    document.getElementById("payment-modal").classList.remove('hidden')
}

function handleDeleteButton(itemDeleteId) {
    const deleteItem = arrayOfYourOrder.filter(function (menuItem) {
        return (menuItem.id === Number(itemDeleteId))
    })[0]

    console.log(deleteItem)

    for (let i = 0; i < arrayOfYourOrder.length; i++) {
        if (deleteItem === arrayOfYourOrder[i]) {
            arrayOfYourOrder.splice(i, 1)
        }
    }

    renderOrder()
}

function getOrder(itemId) {

    const orderedFoodItem = menuArray.filter(function (menuItem) {
        return itemId === ('add-btn-' + menuItem.id)
    })[0]

    arrayOfYourOrder.push({
        name: orderedFoodItem.name,
        price: orderedFoodItem.price,
        id: orderedFoodItem.id
    })

    renderOrder()
}

function renderOrder() {
    if (arrayOfYourOrder.length) {
        let totalPrice = 0
        document.getElementById('order-container').classList.remove('hidden')
        const order = document.getElementById('order')
        let orderListHtml = ''

        arrayOfYourOrder.forEach(function (orderItem) {
            totalPrice += orderItem.price
            orderListHtml += `
        <div class="order-item-container">
            <div class="inner-item-container ">
                <p class="item-name">${orderItem.name}</p>
                <button class="remove-btn" data-delete="${orderItem.id}">remove</button>
            </div>
            <p class="item-price">${orderItem.price}</p>
        </div>
        `
        })

        order.innerHTML = orderListHtml
        document.getElementById('total-price').innerHTML = totalPrice;
    }
    else {
        document.getElementById('order-container').classList.add('hidden')
    }
}

function getMenu() {
    let menuHtml = ''
    menuArray.forEach(function (menuItem) {
        menuHtml += `
        <div class="item-container">
            <div class = 'inner-item-container'>
                <img src="${menuItem.image}" class="item-image">
                <div class="menu-details">
                    <p class="item-name" id="item-name">${menuItem.name}
                    <p class="small-text">${menuItem.ingredients}</p>
                    <p class="item-price" id="item-price">${menuItem.price}</p>
                </div>
            </div>
                <button class="add-btn" id="add-btn-${menuItem.id}">+</button>
        </div>
        `
    })
    return menuHtml
}

function render() {
    const menu = document.getElementById('menu')
    menu.innerHTML = getMenu()
}

render()