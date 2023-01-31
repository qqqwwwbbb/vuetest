let eventBus = new Vue()

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: false
        }
    },
    template: `
      <div>
      
        <ul>
          <span class="tabs" 
                :class="{ activeTab: selectedTab === tab }"
                v-for="(tab, index) in tabs"
                @click="selectedTab = tab"
                :key="tab"
          >{{ tab }}</span>
        </ul>

        <div v-show="selectedTab === 'Reviews'">
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul v-else>
                <li v-for="(review, index) in reviews" :key="index">
                  <p>{{ review.name }}</p>
                  <p>Rating:{{ review.rating }}</p>
                  <p>{{ review.review }}</p>
                </li>
            </ul>
        </div>

        <div v-show="selectedTab === 'Make a Review'">
          <product-review></product-review>
        </div>
    
      </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
        }
    }
})

Vue.component('product-review', {
    template: `
   <form class="review-form" @submit.prevent="onSubmit">
 <p>
   <label for="name">Name:</label>
   <input id="name" v-model="name" placeholder="name">
 </p>
 
 <p>
    <q-btn label="Prompt" color="primary" @click="prompt" />
         <p>Would you recommend this product?</p>
        <label>
          Yes
          <input type="radio" value="Yes" v-model="recommend"/>
        </label>
        <label>
          No
          <input type="radio" value="No" v-model="recommend"/>
        </label>
            
        <p>
          <input type="submit" value="Enter">  
        </p>    
    
</p>

 <p>
   <label for="review">Review:</label>
   <textarea id="review" v-model="review"></textarea>
 </p>

 <p>
   <label for="rating">Rating:</label>
   <select id="rating" v-model.number="rating">
     <option>5</option>
     <option>4</option>
     <option>3</option>
     <option>2</option>
     <option>1</option>
   </select>
 </p>
 
 <p v-if="errors.length">
 <b>Please correct the following error(s):</b>
 <ul>
   <li v-for="error in errors">{{ error }}</li>
 </ul>
</p>

 <p>
   <input type="submit" value="Submit"> 
 </p>

</form>
 `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating && this.recommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
            } else {
                if (!this.name) this.errors.push("Name required.")
                if (!this.review) this.errors.push("Review required.")
                if (!this.rating) this.errors.push("Rating required.")
                if (!this.recommend) this.errors.push("Recommend needed")
            }
        },
        handleClick(){
            this.$confirm.required(
                {
                    message: 'Are you sure you want to proceed?',
                    header: 'Confirmation',
                    icon: 'pi pi-exclamation-triangle',
                    accept: () => {
                        //callback to execute when user confirms the action
                    },
                    reject: () => {
                        //callback to execute when user rejects the action
                    },
                    onShow: () => {
                        //callback to execute when dialog is shown
                    },
                    onHide: () => {
                        //callback to execute when dialog is hidden
                    }
                }
            )
        }
    }
})
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
            type: Boolean,
            required: true
        }
    },
    template: `
   <div class="product">
    <p>Shipping: {{ shipping }}</p>
    <h1>Product Name: </h1>
    <p>{{ title }}</p>
    <h1>Product Description: </h1>
    <p>{{ description }}</p>
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
        <info-tabs :shipping="shipping" :details="details"></info-tabs>
        <div>
        <div class="reviews">
        <product-tabs :reviews="reviews"></product-tabs>
        </div>
        <p v-if="!reviews.length"></p>
        <ul>
          <li v-for="review in reviews">
          <p>{{ review.name }}</p>
          <p>Rating: {{ review.rating }}</p>
          <p>{{ review.review }}</p>
          </li>
        </ul>
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
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
        },
        updateProduct(index) {
            this.selectedVariant = index
            console.log(index)
        },
        addReview(productReview) {
            this.reviews.push(productReview)

        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            return this.brand + ' ' + this.product + ' ' + "On Sale !"
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        },
        mounted() {
            eventBus.$on('review-submitted', productReview => {
                this.reviews.push(productReview)
            })
        }
    }
})
Vue.component('info-tabs', {
    props: {
        shipping: {
            required: true
        },
        details: {
            type: Array,
            required: true
        }
    },
    template: `
      <div>
      
        <ul>
          <span class="tabs" 
                :class="{ activeTab: selectedTab === tab }"
                v-for="(tab, index) in tabs"
                @click="selectedTab = tab"
                :key="tab"
          >{{ tab }}</span>
        </ul>

        <div v-show="selectedTab === 'Shipping'">
          <p>{{ shipping }}</p>
        </div>

        <div v-show="selectedTab === 'Details'">
          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>
        </div>
    
      </div>
    `,
    data() {
        return {
            tabs: ['Shipping', 'Details'],
            selectedTab: 'Shipping'
        }
    }
})
let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        removeCart(id) {
            for (let i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                    this.cart.splice(i, 1);
                }
            }
        }
    }
})



