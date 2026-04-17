

// ================== GLOBALS / SETUP ==================
const toggleBasketBtn = document.getElementById("toggle-basket");

const MenuContainer = document.getElementById("menu");
const categories = ["burger", "sides", "snacks", "drinks"];

const basketContent = document.getElementById("basket-content");
const basketItems = document.getElementById("basket-items");
const basketFooter = document.getElementById("basket-footer");

let euro = Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
});

let basket = [];


// ================== INIT ==================
function Init() {
    renderMenu();
    renderBasket();
}


// ================== RENDER ==================
function renderMenu() {
    MenuContainer.innerHTML = "";

    buildCategoryHeader();
    buildCategoryItems();
}

function buildCategoryHeader() {
    categories.forEach(category => {
        MenuContainer.innerHTML += getCategoryHeaderTemplate(category);
    });
}

function buildCategoryItems() {
    categories.forEach(category => {
        const list = document.getElementById(`${category}-list`);
        const items = menu.filter(item => item.category === category);

        items.forEach(item => {
            list.innerHTML += getDishTemplate(item);
        });
    });
}

function renderBasket() {

    basketItems.classList.remove("empty");
    if (basket.length === 0) {
        basketItems.classList.add("empty");
        renderEmptyBasket();
    } else {
        renderFullBasket();
    }
}

function renderEmptyBasket() {
    basketItems.innerHTML = getEmptyBasketTemplate();
    basketFooter.innerHTML = "";
}

function renderFullBasket() {
    basketItems.innerHTML = "";

    basket.forEach(item => {
        let decreaseIcon = getDecreaseIcon(item.amount);
        basketItems.innerHTML += getBasketItemTemplate(item, decreaseIcon);;
    });

    const calculation = calculateBasket();
    basketFooter.innerHTML = getBasketFooterTemplate(calculation);
}

function getDecreaseIcon(amount) {
    if (amount === 1) {
        return getTrashIcon();
    }

    return getMinusIcon();
}


// ================== CALC ==================
function calculateBasket() {
    const subtotal = basket.reduce((sum, item) => {
        return sum + item.price * item.amount;
    }, 0);

    const deliveryFee = 0.99; // später dynamisch
    const total = subtotal + deliveryFee;

    return {
        subtotal,
        deliveryFee,
        total
    };
}


// ================== BASKET LOGIC ==================
function addToBasket(id) {
    const item = menu.find(i => i.id == id);
    const existingItem = basket.find(i => i.id == id);

    if (existingItem) {
        existingItem.amount++;
    } else {
        basket.push({
            id: item.id,
            name: item.name,
            price: item.price,
            amount: 1
        });
    }
    renderBasket();
}

function handleBasketAction(id, action) {
    let item = basket.find(i => i.id == id);
    if (!item) return;

    if (action === "increase") {
        item.amount++;
    }

    if (action === "decrease") {
        if (item.amount === 1) {
            basket = basket.filter(i => i.id != id);
        } else {
            item.amount--;
        }
    }

    renderBasket();
}

function submitOrder() {
    toggleBasket();
    // saveLastOrder(); // optional
    basket = [];
    renderBasket();
    showOrderDialog();
}


// ================== UI ==================
function toggleBasket() {
    basketContent.classList.toggle("open");
    toggleBasketBtn.classList.toggle("basket-open");
}

function showOrderDialog() {
    document.getElementById("order-dialog").showModal();
}




// ================== HELPERS ==================
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function parseNumberToCurrencyEuro(number) {
    return euro.format(number);
}


// ================== EVENTS ==================
window.addEventListener("load", Init)
toggleBasketBtn.addEventListener("click", toggleBasket);

document.getElementById("close-dialog-btn").addEventListener("click", () => {
    document.getElementById("order-dialog").close();
});

document.addEventListener("click", (e) => {
    if (e.target.id === "order-btn") {
        submitOrder();
    }
});

document.addEventListener("click", (e) => {
    const button = e.target.closest(".add-btn");

    if (!button) return;

    const id = button.dataset.id;

    addToBasket(id);
});

basketItems.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (!button) return;

    const id = button.dataset.id;
    const action = button.dataset.action;

    handleBasketAction(id, action);
});



