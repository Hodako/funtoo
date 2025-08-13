document.addEventListener('DOMContentLoaded', () => {
    const productListDiv = document.getElementById('product-list');
    const modal = document.getElementById('product-details-modal');
    const closeButton = document.querySelector('.close-button');
    const detailName = document.getElementById('detail-name');
    const detailDescription = document.getElementById('detail-description');
    const detailPrice = document.getElementById('detail-price');
    const detailDelivery = document.getElementById('detail-delivery');
    const addToCartBtn = modal.querySelector('.add-to-cart-btn');

    // Mock product data (in a real app, this would come from an API)
    const products = [
        { id: 1, name: 'Laptop', price: 1200, delivery: '3-5 days', description: 'Powerful laptop for all your needs. Features a high-resolution display and long battery life.' },
        { id: 2, name: 'Mouse', price: 25, delivery: '1-2 days', description: 'Ergonomic wireless mouse with precise tracking and customizable buttons.' },
        { id: 3, name: 'Keyboard', price: 75, delivery: '2-3 days', description: 'Mechanical keyboard with RGB lighting, satisfying key presses, and durable design.' },
        { id: 4, name: 'Monitor', price: 300, delivery: '3-5 days', description: '27-inch 4K monitor with vibrant colors and wide viewing angles, perfect for work and entertainment.' },
        { id: 5, name: 'Webcam', price: 50, delivery: '1-2 days', description: 'Full HD webcam for clear video calls and streaming.' },
        { id: 6, name: 'Headphones', price: 150, delivery: '2-3 days', description: 'Noise-cancelling over-ear headphones with superb audio quality.' },
        { id: 7, name: 'External SSD', price: 90, delivery: '2-4 days', description: 'Fast and portable external SSD for all your storage needs.' },
        { id: 8, name: 'Gaming Chair', price: 250, delivery: '5-7 days', description: 'Ergonomic gaming chair for long gaming sessions.' },
        { id: 9, name: 'Smartwatch', price: 180, delivery: '3-5 days', description: 'Feature-rich smartwatch with health tracking and notifications.' },
        { id: 10, name: 'USB Hub', price: 20, delivery: '1-2 days', description: '4-port USB 3.0 hub for expanding connectivity.' }
    ];

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <h2>${product.name}</h2>
            <p>${product.description.substring(0, 70)}...</p>
            <p class="price">$${product.price}</p>
            <p class="delivery">Delivery: ${product.delivery}</p>
            <button class="view-details-btn" data-product-id="${product.id}">View Details</button>
        `;
        productListDiv.appendChild(productItem);
    });

    // Event listener for View Details buttons
    productListDiv.addEventListener('click', (event) => {
        if (event.target.classList.contains('view-details-btn')) {
            const productId = parseInt(event.target.dataset.productId);
            const product = products.find(p => p.id === productId);
            if (product) {
                detailName.textContent = product.name;
                detailDescription.textContent = product.description;
                detailPrice.textContent = `$${product.price}`;
                detailDelivery.textContent = `Delivery: ${product.delivery}`;
                addToCartBtn.dataset.productId = product.id; // Store product ID for add to cart
                modal.style.display = 'flex'; // Show modal
            }
        }
    });

    // Close modal button
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Add to Cart functionality
    addToCartBtn.addEventListener('click', (event) => {
        const productId = parseInt(event.target.dataset.productId);
        const product = products.find(p => p.id === productId);
        if (product) {
            alert(`Added ${product.name} to cart! (This is a placeholder functionality)`);
            modal.style.display = 'none';
        }
    });

    // Initialize Telegram Web App (if running inside Telegram)
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand(); // Expand the Mini App to full screen
    }
});