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
        inStock: false,
        onSale: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'blue',
                variantImage: "./assets/sonic1.jpg"
            },
            {
                variantId: 2235,
                variantColor: 'red',
                variantImage: "./assets/shadow1.jpg"
            }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        cart: 0
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        removeFromCart() {
            this.cart -= 1
        },
        updateProduct(variantImage) {
            this.image = variantImage
        }
    }
})

