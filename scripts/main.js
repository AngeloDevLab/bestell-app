



// ================== GLOBALS / SETUP ==================
const toggleBasketBtn = document.getElementById("toggle-basket");
const MenuContainer = document.getElementById("menu");
const basketContent = document.getElementById("basket-content");
const basketItems = document.getElementById("basket-items");
const basketFooter = document.getElementById("basket-footer");

const categories = ["burger", "sides", "snacks", "drinks"];

let euro = Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
});

let basket = [];




// ================== INIT ==================
function Init() {
    updateUI();
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
            const amount = getItemAmount(item.id);
            list.innerHTML += getDishTemplate(item, amount);
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
    addOrIncreaseItem(id);
    updateUI();
}

function handleBasketAction(id, action) {
    if (action === "increase") {
        addOrIncreaseItem(id);
    }

    if (action === "decrease") {
        decreaseOrRemoveItem(id);
    }

    updateUI();
}

function addOrIncreaseItem(id) {
    const item = menu.find(i => i.id == id);
    const existing = basket.find(i => i.id == id);

    if (existing) {
        existing.amount++;
    } else {
        basket.push({
            id: item.id,
            name: item.name,
            price: item.price,
            amount: 1
        });
    }
}

function decreaseOrRemoveItem(id) {
    const item = basket.find(i => i.id == id);
    if (!item) return;

    if (item.amount === 1) {
        basket = basket.filter(i => i.id != id);
    } else {
        item.amount--;
    }
}

function updateBasketCount() {
    const count = basket.reduce((sum, item) => sum + item.amount, 0);
    const badge = document.getElementById("basket-count");

    badge.innerText = count;

    if (count > 0) {
        badge.classList.remove("hidden");
        badge.classList.add("pop");
        setTimeout(() => badge.classList.remove("pop"), 200);
    } else {
        badge.classList.add("hidden");
    }
}

function submitOrder() {
    // saveLastOrder(); // optional
    basket = [];

    toggleBasket();
    updateUI();
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

function updateUI() {
    renderMenu();
    renderBasket();
    updateBasketCount();
}


// ================== HELPERS ==================
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function parseNumberToCurrencyEuro(number) {
    return euro.format(number);
}

function getDecreaseIcon(amount) {
    if (amount === 1) {
        return getTrashIcon();
    }

    return getMinusIcon();
}

function getItemAmount(id) {
    const basketItem = basket.find(i => i.id == id);
    return basketItem ? basketItem.amount : 0;
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



