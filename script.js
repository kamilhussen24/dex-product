$(document).ready(function() {
    // Toggle menu and header shadow
    $('.menu-toggle').click(function() {
        $('.nav-menu').toggleClass('active');
        $('header').toggleClass('active');
    });

    // Fallback products data in case Product.json fails to load
    const fallbackProducts = [
        { name: "Prodact Load Error", price: "৳000", image: "image/error-load.jpg", link: "404.html" },
        { name: "Prodact Load Error", price: "৳000", image: "image/error-load.jpg", link: "404.html" }
    ];

    // Load products function
    const productList = $("#productList");
    const initialDisplayCount = 4;
    let displayedCount = initialDisplayCount;

    function loadProducts(products, start, end) {
        for (let i = start; i < end && i < products.length; i++) {
            const product = products[i];
            const card = `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Price: ${product.price}</p>
                    <a href="products/${product.link}">
            <i class="fas fa-shopping-cart"></i> Buy Now </a>
                </div>
            `;
            productList.append(card);
        }
    }

    // Function to initialize product display
    function initializeProducts(products) {
        // Load first 4 products
        loadProducts(products, 0, initialDisplayCount);

        // Handle Load More button
        const loadMoreButton = $('#loadMore');
        if (products.length <= initialDisplayCount) {
            loadMoreButton.addClass('hidden');
        }

        loadMoreButton.click(function() {
            loadProducts(products, displayedCount, products.length);
            displayedCount = products.length;
            loadMoreButton.addClass('hidden');
        });
    }

    // Fetch Products.json
    $.getJSON('products/products.json', function(products) {
        console.log('Successfully loaded Product.json:', products);
        initializeProducts(products);
    }).fail(function(jqxhr, textStatus, error) {
        console.error('Failed to load Product.json:', textStatus, error);
        console.warn('Using fallback product data');
        initializeProducts(fallbackProducts);
    });

    // WhatsApp Order with Products Link
    $('.order-now').click(function(e) {
        e.preventDefault();
        const product = $(this).data('product');
        const price = $(this).data('price');
        const desc = $(this).data('desc');
        const link = $(this).data('link');
        const message = `Order Details:%0AProduct: ${product}%0APrice: ${price}%0ADescription: ${desc}%0ALink: ${link}`;
        const whatsappNumber = "+8801402143420";
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    });
});