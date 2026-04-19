function getCategoryHeaderTemplate(category) {
    return `
        <section class="dish-categories" id="${category}">

            <header>
                <div class="dish-header-content max-content">
                    <img src="./assets/icons/categories/${category}.png" alt="${category} icon">
                    <h2>${capitalize(category)}</h2>
                </div>
            </header>

            <div class="dish-list max-content" id="${category}-list"></div>

        </section>
    `;
}

function getDishTemplate(item, amount) {
    return `
        <div class="dish-card">

            <div class="dish-image-and-text-container">
                <img src="./assets/images/menu/${item.image}" alt="${item.name}">
                <div>
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
            </div>

            <div class="dish-card-footer">
                <p class="price-text">${parseNumberToCurrencyEuro(item.price)}</p>
                <button class="add-btn" data-id="${item.id}">
                        ${amount > 0
            ? `<span class="button-badge">${getShoppingIcon()} ${amount}</span>`
            : "Hinzufügen"}
                </button>
            </div>
        </div>
    `;
}

function getEmptyBasketTemplate() {
    return `
        <div class="is-empty-card">
            <p>Dein Warenkorb ist leer.<br>Zeit etwas zu bestellen.</p>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
        </div>
    `;
}

function getBasketItemTemplate(item, decreaseIcon) {
    return `
        <div class="basket-card">
            <p>${item.amount} x ${item.name}</p>

            <div class="amount-container">

                <div class="amount-controller">
                    <button class="svg-btn" data-id="${item.id}" data-action="decrease"
>
                        ${decreaseIcon}
                    </button>

                    <p>${item.amount}</p>

                    <button class="svg-btn" data-id="${item.id}" data-action="increase">
                        ${getPlusIcon()}
                    </button>
                </div>


                <p>${parseNumberToCurrencyEuro(item.price * item.amount)}</p>
            </div>

        </div>
    `;
}

function getTrashIcon() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
    `;
}

function getMinusIcon() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8" />
        </svg>
    `;
}

function getPlusIcon() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
        </svg>
    `;
}

function getShoppingIcon() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="">
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path
                d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
    `;
}

function getBasketFooterTemplate(calculation) {
    return `
        <div class="subtotal">
            <p>Zwischensumme</p>
            <p>${parseNumberToCurrencyEuro(calculation.subtotal)}</p>
        </div>

        <div class="delivery-fee">
            <p>${deliveryMode === "pickup" ? "Abholung" : "Lieferkosten"}</p>
            <p>${deliveryMode === "pickup" ? "0,00 €" : parseNumberToCurrencyEuro(calculation.deliveryFee)}</p>
        </div>

        <div class="delivery-info">
            ${deliveryMode === "pickup" 
                ? "Abholung kostenlos" 
                : calculation.isFreeDelivery 
                    ? "Kostenlose Lieferung"
                    : `Noch ${parseNumberToCurrencyEuro(calculation.missingForFree)} bis kostenlose Lieferung`
            }
        </div>

        <hr>

        <div class="total">
            <p>Gesamt</p>
            <p>${parseNumberToCurrencyEuro(calculation.total)}</p>
        </div>

        <button id="order-btn" class="order-btn" ${basket.length === 0 ? "disabled" : ""}>Jetzt Bestellen</button>
    `;
}