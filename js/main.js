let product = "Socks";

let app = new Vue({
    el: '#app',
    data: {
        product: "Sonic",
        brand: "Vue mastery",
        altText: "A pair of socks",
        description: "A pair of warm, fuzzy socks",
        selectedVariant: 0,
        link: "https://www.amazon.com/s?k=sonic&ref=nb_sb_noss",
        inventory: 5,
        onSale: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'blue',
                variantImage: "./assets/sonic1.jpg",
                variantQuantity: 10
            },
            {
                variantId: 2235,
                variantColor: 'red',
                variantImage: "./assets/shadow1.jpg",
                variantQuantity: 0
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
        updateProduct(index) {
            this.selectedVariant = index
            console.log(index)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale(){
            return this.brand + ' ' + this.product + ' ' + "On Sale !"
        }
    }
})

