Vue.component('detail', {
    props: {
        type: Array,
        required: true
    },
    template: `
    <ul>
        <li v-for="detail in details"> <b>{{ detail }}</b></li>
    </ul>
    `
})
Vue.component('product', {
    props: {
        premium: {
            type:Boolean,
            required: true
        }
    },
    template: `
   <div class="product">
       <div class="cart">
        <h2> ~ Cart({{ cart }}) ~ </h2>
        <p>Shipping: {{ shipping }}</p>
    </div>
    <h1>Product Name: </h1>
    <p>{{ title }}</p>
    <h1>Product Description: </h1>
    <p>{{ description }}</p>
    <p>Materials :</p>
    <p>Versions : </p>
    <div
            class="color-box"
            v-for="(variant, index) in variants"
            :key="variant.variantId"
            :style="{ backgroundColor: variant.variantColor }"
            @mouseover="updateProduct(index)">
            <p> {{ }} </p>
    </div>
    <p> Sizes :</p>
    <div class="size-box">
    <li v-for="size in sizes"> <b>{{ size }}</b></li>
    </div>
    <span class="stock-line"
          :style="[inStock === true ? {'text-decoration':'none'} : {'text-decoration':'line-through', 'color':'#718093'}]">
        <p>In stock</p>
    </span>
    <a v-bind:href="link">More products like this</a>
    <div class="product">
        <div class="product-image">
            <img v-bind:src="image" v-bind:alt="altText" />
        </div>
        <br>
        <button v-on:click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }"
        >
            Add to cart
        </button>
        <button v-on:click="removeFromCart">Remove from cart</button>
        <div class="product-info">
            <h1>{{ product }}</h1>
            <p v-if="inventory > 10">In stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out! Hurry up !</p>
            <p v-else>Sadly out of stock right now...</p>
            <p>{{ sale }}</p>
        </div>
    </div>
   </div>
 `,
    data() {
        return {
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
        }
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
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        }
    }
})
let app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
})



