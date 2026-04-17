
const toggleBasketBtn = document.getElementById("toggle-basket");

window.addEventListener("load", Init)
toggleBasketBtn.addEventListener("click", toggleBasket);

const MenuContainer = document.getElementById("menu");
const categories = ["burger", "sides", "snacks", "drinks"];

let euro = Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
});

let basket = [];




function Init() {
    renderMenu();
    renderBasket()
}

function renderMenu() {
    MenuContainer.innerHTML = "";

    buildCategoryHeader();
    buildCategoryItems();
}

function renderBasket() {
    const basketContent = document.getElementById("basket-content");

    basketContent.innerHTML = "";

    if (basket.length === 0) {
        basketContent.innerHTML = getEmptyBasketTemplate();
        return;
    }

    // später: items rendern
}


// UI Helper
function toggleBasket() {
    let basketPanelRef = document.getElementById("basket-content");

    basketPanelRef.classList.toggle("open");
    toggleBasketBtn.classList.toggle("basket-open");
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function parseNumberToCurrencyEuro(number) {
    return euro.format(number);
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