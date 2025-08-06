console.log('====================================');
console.log("Bundle Builder Connected");
console.log('====================================');

// Product data with Pexels stock images
const products = [
    {
        id: 1,
        name: "Luxury Designer Outfit #1",
        price: 199.99,
        image: "/photo-1432149877166-f75d49000351.jpg"
    },
    {
        id: 2,
        name: "Luxury Designer Outfit #2",
        price: 249.99,
        image: "/photo-1515886657613-9f3515b0c78f.jpg"
    },
    {
        id: 3,
        name: "Luxury Designer Outfit #3",
        price: 179.99,
        image: "/photo-1529139574466-a303027c1d8b.jpg"
    },
    {
        id: 4,
        name: "Luxury Designer Outfit #4",
        price: 229.99,
        image: "/photo-1588117260148-b47818741c74.jpg"
    },
    {
        id: 5,
        name: "Luxury Designer Outfit #5",
        price: 159.99,
        image: "/photo-1603344797033-f0f4f587ab60.jpg"
    },
    {
        id: 6,
        name: "Luxury Designer Outfit #6",
        price: 269.99,
        image: "/photo-1608748010899-18f300247112.jpg"
    },
    {
        id: 7,
        name: "Luxury Designer Outfit #7",
        price: 189.99,
        image: "/photo-1632149877166-f75d49000351.jpg"
    }
];


// CSS for loading animation

// Bundle state
const bundleState = {
    selectedProducts: new Map(),
    discountThreshold: 3,
    discountRate: 0.3
};

// DOM elements
const productsGrid = document.getElementById('products-grid');
const selectedProductsContainer = document.getElementById('selected-products');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const discountInfo = document.getElementById('discount-info');
const originalPriceRow = document.getElementById('original-price');
const discountAmountRow = document.getElementById('discount-amount');
const originalTotal = document.getElementById('original-total');
const discountValue = document.getElementById('discount-value');
const finalTotal = document.getElementById('final-total');
const addToCartBtn = document.getElementById('add-to-cart');

// Initialize the app
function init() {
    renderProducts();
    updateBundleSidebar();
    setupEventListeners();
}

// Render product cards
function renderProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card loading';
        productCard.style.animationDelay = `${index * 0.1}s`;
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-bundle-btn" data-product-id="${product.id}">
                    Add to Bundle
                </button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
        
        // Add click event to the button
        const addBtn = productCard.querySelector('.add-to-bundle-btn');
        addBtn.addEventListener('click', () => toggleProduct(product.id));
    });
}

// Toggle product selection
function toggleProduct(productId) {
    const product = products.find(p => p.id === productId);
    const productCard = document.querySelector(`[data-product-id="${productId}"]`).closest('.product-card');
    const addBtn = document.querySelector(`[data-product-id="${productId}"]`);
    
    if (bundleState.selectedProducts.has(productId)) {
        // Remove from bundle
        bundleState.selectedProducts.delete(productId);
        productCard.classList.remove('selected');
        addBtn.classList.remove('added');
        addBtn.textContent = 'Add to Bundle';
    } else {
        // Add to bundle
        bundleState.selectedProducts.set(productId, product);
        productCard.classList.add('selected');
        addBtn.classList.add('added');
        addBtn.textContent = '✓ Added';
    }
    
    updateBundleSidebar();
}

// Remove product from bundle
function removeProduct(productId) {
    const productCard = document.querySelector(`[data-product-id="${productId}"]`).closest('.product-card');
    const addBtn = document.querySelector(`[data-product-id="${productId}"]`);
    
    bundleState.selectedProducts.delete(productId);
    productCard.classList.remove('selected');
    addBtn.classList.remove('added');
    addBtn.textContent = 'Add to Bundle';
    
    updateBundleSidebar();
}

// Update bundle sidebar
function updateBundleSidebar() {
    const selectedCount = bundleState.selectedProducts.size;
    const maxItems = bundleState.discountThreshold;
    
    // Update progress bar
    const progressPercentage = Math.min((selectedCount / maxItems) * 100, 100);
    progressFill.style.width = `${progressPercentage}%`;
    progressText.textContent = `${selectedCount}/${maxItems} selected`;
    
    // Update selected products display
    renderSelectedProducts();
    
    // Calculate and display pricing
    updatePricing();
    
    // Update CTA button
    updateCTAButton();
}

// Render selected products
function renderSelectedProducts() {
    if (bundleState.selectedProducts.size === 0) {
        selectedProductsContainer.innerHTML = '<p class="empty-state">Select products to build your bundle</p>';
        return;
    }
    
    selectedProductsContainer.innerHTML = '';
    
    bundleState.selectedProducts.forEach((product) => {
        const productElement = document.createElement('div');
        productElement.className = 'selected-product';
        
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="selected-product-image">
            <div class="selected-product-info">
                <div class="selected-product-name">${product.name}</div>
                <div class="selected-product-price">$${product.price.toFixed(2)}</div>
            </div>
            <button class="remove-btn" onclick="removeProduct(${product.id})" title="Remove from bundle">
                ✕
            </button>
        `;
        
        selectedProductsContainer.appendChild(productElement);
    });
}

// Update pricing calculations
function updatePricing() {
    const selectedProducts = Array.from(bundleState.selectedProducts.values());
    const originalPrice = selectedProducts.reduce((sum, product) => sum + product.price, 0);
    const hasDiscount = bundleState.selectedProducts.size >= bundleState.discountThreshold;
    const discountAmount = hasDiscount ? originalPrice * bundleState.discountRate : 0;
    const finalPrice = originalPrice - discountAmount;
    
    // Show/hide discount information
    if (hasDiscount) {
        discountInfo.style.display = 'flex';
        originalPriceRow.style.display = 'flex';
        discountAmountRow.style.display = 'flex';
        
        originalTotal.textContent = `$${originalPrice.toFixed(2)}`;
        discountValue.textContent = `-$${discountAmount.toFixed(2)}`;
    } else {
        discountInfo.style.display = 'none';
        originalPriceRow.style.display = 'none';
        discountAmountRow.style.display = 'none';
    }
    
    finalTotal.textContent = `$${finalPrice.toFixed(2)}`;
}

// Update CTA button state
function updateCTAButton() {
    const selectedCount = bundleState.selectedProducts.size;
    
    if (selectedCount >= bundleState.discountThreshold) {
        addToCartBtn.disabled = false;
        addToCartBtn.textContent = `Add Bundle to Cart (${selectedCount} items)`;
    } else {
        addToCartBtn.disabled = true;
        addToCartBtn.textContent = `Select ${bundleState.discountThreshold - selectedCount} more items`;
    }
}

// Setup event listeners
function setupEventListeners() {
    // CTA button click handler
    addToCartBtn.addEventListener('click', handleAddToCart);
    
    // Handle image loading errors
    document.addEventListener('error', (e) => {
        if (e.target.tagName === 'IMG') {
            e.target.src = 'https://via.placeholder.com/400x300/667eea/ffffff?text=Product+Image';
        }
    }, true);
}

// Handle add to cart action
function handleAddToCart() {
    if (bundleState.selectedProducts.size < bundleState.discountThreshold) {
        return;
    }
    
    const selectedProducts = Array.from(bundleState.selectedProducts.values());
    const originalPrice = selectedProducts.reduce((sum, product) => sum + product.price, 0);
    const discountAmount = originalPrice * bundleState.discountRate;
    const finalPrice = originalPrice - discountAmount;
    
    const bundleData = {
        products: selectedProducts,
        originalPrice: originalPrice,
        discountAmount: discountAmount,
        finalPrice: finalPrice,
        itemCount: selectedProducts.length
    };
    
    console.log('Bundle added to cart:', bundleData);
    
    // Show success message
    showSuccessMessage();
}

// Show success message
function showSuccessMessage() {
    const originalText = addToCartBtn.textContent;
    addToCartBtn.textContent = '✓ Added to Cart!';
    addToCartBtn.style.background = '#10b981';
    
    setTimeout(() => {
        addToCartBtn.textContent = originalText;
        addToCartBtn.style.background = '';
    }, 2000);
}

// Make removeProduct available globally
window.removeProduct = removeProduct;

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Add some smooth scrolling for mobile
if (window.innerWidth <= 768) {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-bundle-btn')) {
            setTimeout(() => {
                document.querySelector('.bundle-sidebar').scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }, 300);
        }
    });
}