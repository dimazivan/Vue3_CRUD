<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT DATA</h4>
                        <hr>

                        <form @submit.prevent="update">
                            <div class="mb-3 form-group">
                                <label for="title" class="font-weight-bold">Product Name</label>
                                <input type="text" class="form-control" v-model="product.title"
                                    placeholder="Masukkan Nama Product">
                                <div v-if="validation.title" class="mt-2 alert alert-danger">
                                    {{ validation.title[0] }}
                                </div>
                            </div>
                            <div class="mb-3 form-group">
                                <label for="description" class="font-weight-bold">Description</label>
                                <textarea class="form-control" rows="4" v-model="product.description"
                                    placeholder="Masukkan Deskripsi Product"></textarea>
                                <div v-if="validation.description" class="mt-2 alert alert-danger">
                                    {{ validation.description[0] }}
                                </div>
                            </div>
                            <div class="mb-3 form-group">
                                <label class="form-label fw-bold">Product Price</label>
                                <input type="number" class="form-control" v-model="product.price"
                                    placeholder="Product Price" min="100">
                                <div v-if="validation.price" class="alert alert-danger mt-2">
                                    <span>{{ validation.price[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3 form-group">
                                <label class="form-label fw-bold">Product Discount</label>
                                <input type="number" class="form-control" v-model="product.discount"
                                    placeholder="Product Discount" min="0">
                                <div v-if="validation.discount" class="alert alert-danger mt-2">
                                    <span>{{ validation.discount[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3 form-group">
                                <label class="form-label fw-bold">Product Rating</label>
                                <input type="number" class="form-control" v-model="product.rating"
                                    placeholder="Product Rating" min="1">
                                <div v-if="validation.rating" class="alert alert-danger mt-2">
                                    <span>{{ validation.rating[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3 form-group">
                                <label class="form-label fw-bold">Product Stock</label>
                                <input type="number" class="form-control" v-model="product.stock"
                                    placeholder="Product Stock" min="1">
                                <div v-if="validation.stock" class="alert alert-danger mt-2">
                                    <span>{{ validation.stock[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3 form-group">
                                <label class="form-label fw-bold">Product Brand</label>
                                <input type="text" class="form-control" v-model="product.brand" placeholder="Product Brand"
                                    readonly>
                                <div v-if="validation.brand" class="alert alert-danger mt-2">
                                    <span>{{ validation.brand[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3 form-group">
                                <label class="form-label fw-bold">Product Category</label>
                                <input type="text" class="form-control" v-model="product.category"
                                    placeholder="Product Category" readonly>
                                <div v-if="validation.category" class="alert alert-danger mt-2">
                                    <span>{{ validation.category[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3 form-group">
                                <label class="form-label fw-bold">Product Thumbnail</label>
                                <input type="text" class="form-control" v-model="product.thumbnail"
                                    placeholder="Product Thumbnail">
                                <div v-if="validation.thumbnail" class="alert alert-danger mt-2">
                                    <span>{{ validation.thumbnail[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3 form-group">
                                <label class="form-label fw-bold">Fvoid</label>
                                <input type="number" class="form-control" v-model="product.fvoid" placeholder="fvoid"
                                    min="1" max="2">
                                <div v-if="validation.fvoid" class="alert alert-danger mt-2">
                                    <span>{{ validation.fvoid[0] }}</span>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
        //state products
        const product = reactive({
            title: '',
            description: '',
            price: '',
            discount: '',
            rating: '',
            stock: '',
            brand: '',
            category: '',
            // cbbrand: '',
            // cbcategory: '',
            thumbnail: '',
            // images: '',
            fvoid: '',
        })

        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()

        //vue router
        const route = useRoute()

        //mounted
        onMounted(() => {

            //get API from Laravel Backend
            axios.get(`http://localhost:8000/api/api_product/${route.params.id}`)
                .then(response => {
                    //assign state product with response data
                    product.title = response.data.data.title
                    product.description = response.data.data.description
                    product.price = response.data.data.price
                    product.discount = response.data.data.discountPercentage
                    product.rating = response.data.data.rating
                    product.stock = response.data.data.stock
                    product.brand = response.data.data.brand
                    product.category = response.data.data.category
                    product.thumbnail = response.data.data.thumbnail
                    product.fvoid = response.data.data.fvoid
                }).catch(error => {
                    console.log(error.response.data)
                })

        })
        //method update
        function update() {
            let title = product.title
            let description = product.description
            let price = product.price
            let discount = product.discount
            let rating = product.rating
            let stock = product.stock
            let brand = product.brand
            let category = product.category
            let thumbnail = product.thumbnail
            let fvoid = product.fvoid
            // let id = route.params.ids

            // console.log(id);

            axios.put(`http://localhost:8000/api/api_product/${route.params.id}`, {
                title: title,
                description: description,
                price: price,
                discountPercentage: discount,
                rating: rating,
                stock: stock,
                brand: brand,
                category: category,
                thumbnail: thumbnail,
                fvoid: fvoid,
            }).then(() => {

                //redirect ke product index
                router.push({
                    name: 'product.index'
                })

            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })
        }
        //return
        return {
            product,
            validation,
            router,
            update
        }
    }
}
</script>

<style>
body {
    background: lightgray;
}
</style>