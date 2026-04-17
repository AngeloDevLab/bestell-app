
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

function getDishTemplate(item) {
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
                <button class="add-btn" data-id="${item.id}">Hinzufügen</button>
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