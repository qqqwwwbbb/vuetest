let product = "Socks";

let app = new Vue({
    el: '#app',
    data: {
        product: "Sonic",
        altText: "A pair of socks",
        description: "A pair of warm, fuzzy socks",
        image: "./assets/sonic2.jpg",
        link: "https://www.amazon.com/s?k=sonic&ref=nb_sb_noss",
        inventory: 5,
        inStock: true,
        onSale: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green'
            },
            {
                variantId: 2235,
                variantColor: 'blue'
            }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    }
})
