 const toggleBasketBtn = document.getElementById("toggle-basket");

toggleBasketBtn.addEventListener("click", toggleBasket);

function toggleBasket() {
    let basketPanelRef = document.getElementById("basket-content");

    basketPanelRef.classList.toggle("open");
    toggleBasketBtn.classList.toggle("basket-open");
}