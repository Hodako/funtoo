document.addEventListener('DOMContentLoaded', () => {
    const productListDiv = document.getElementById('product-list');

    // Mock product data (in a real app, this would come from an API)
    const products = [
        { id: 1, name: 'Laptop', price: 1200, delivery: '3-5 days', description: 'Powerful laptop for all your needs.' },
        { id: 2, name: 'Mouse', price: 25, delivery: '1-2 days', description: 'Ergonomic wireless mouse.' },
        { id: 3, name: 'Keyboard', price: 75, delivery: '2-3 days', description: 'Mechanical keyboard with RGB lighting.' },
        { id: 4, name: 'Monitor', price: 300, delivery: '3-5 days', description: '27-inch 4K monitor.' },
    ];

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p class="price">$${product.price}</p>
            <p class="delivery">Delivery: ${product.delivery}</p>
        `;
        productListDiv.appendChild(productItem);
    });

    // Initialize Telegram Web App (if running inside Telegram)
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand(); // Expand the Mini App to full screen
    }
});