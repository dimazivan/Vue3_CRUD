<script setup>
//import ref
import { ref, onMounted } from "vue";

//import router
import { useRouter } from 'vue-router';

//init router
const router = useRouter();

//define state
// const image = ref("");
const title = ref("");
const description = ref("");
const price = ref("");
const discount = ref("");
const rating = ref("");
const stock = ref("");
// const brand = ref("");
const cbbrand = ref("");
const cbcategory = ref("");
const errors = ref([]);

//method for handle file changes
// const handleFileChange = (e) => {
//     //assign file to state
//     image.value = e.target.files[0];
// };

//method "storeProduct"
const storeProduct = async () => {

    //init formData
    let formData = new FormData();

    //assign state value to formData
    // formData.append("image", image.value);
    formData.append("title", title.value);
    formData.append("description", description.value);
    formData.append("price", price.value);
    formData.append("discountPercentage", discount.value);
    formData.append("rating", rating.value);
    formData.append("stock", stock.value);
    // formData.append("brand", brand.value);
    formData.append("brand", cbbrand.value);
    formData.append("category", cbcategory.value);

    // Display the key/value pairs
    for (var pair of formData.entries()) {
        console.log(pair[0] + ' = ' + pair[1]);
    }

    //store data with API
    // await api.post('/api/api_product', formData)
    //     .then(() => {
    //         //redirect
    //         router.push({ path: "/product" });
    //     })
    //     .catch((error) => {
    //         //assign response error data to state "errors"
    //         errors.value = error.response.data;
    //     });
};

//import api
import api from '../../api';

const data_brand = ref([]);
const data_category = ref([]);

const fetchDataBrand = async () => {
    await api.get('/api/data/cb/brand/product')
        .then(response => {
            data_brand.value = response.data.data
        });

    console.log(data_brand);
}

const fetchDataCategory = async () => {
    await api.get('/api/data/cb/category/product')
        .then(response => {
            data_category.value = response.data.data
        });

    console.log(data_category);
}

onMounted(() => {
    fetchDataBrand();
    fetchDataCategory();
});
</script>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <form @submit.prevent="storeProduct()">
                            <!-- <div class="mb-3">
                                <label class="form-label fw-bold">Image</label>
                                <input type="file" class="form-control" @change="handleFileChange($event)">
                                <div v-if="errors.image" class="alert alert-danger mt-2">
                                    <span>{{ errors.image[0] }}</span>
                                </div>
                            </div> -->
                            <div class="mb-3">
                                <label class="form-label fw-bold">Product Name</label>
                                <input type="text" class="form-control" v-model="title" placeholder="Product Name">
                                <div v-if="errors.title" class="alert alert-danger mt-2">
                                    <span>{{ errors.title[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Description</label>
                                <textarea class="form-control" v-model="description" rows="5"
                                    placeholder="Description Item"></textarea>
                                <div v-if="errors.description" class="alert alert-danger mt-2">
                                    <span>{{ errors.description[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Product Price</label>
                                <input type="number" class="form-control" v-model="price" placeholder="Product Price"
                                    min="100">
                                <div v-if="errors.price" class="alert alert-danger mt-2">
                                    <span>{{ errors.price[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Product Discount</label>
                                <input type="number" class="form-control" v-model="discount" placeholder="Product Price"
                                    min="100">
                                <div v-if="errors.discount" class="alert alert-danger mt-2">
                                    <span>{{ errors.discount[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Product stock</label>
                                <input type="number" class="form-control" v-model="rating" placeholder="Product Price"
                                    min="100">
                                <div v-if="errors.rating" class="alert alert-danger mt-2">
                                    <span>{{ errors.rating[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Product Stock</label>
                                <input type="number" class="form-control" v-model="stock" placeholder="Product Stock"
                                    min="100">
                                <div v-if="errors.stock" class="alert alert-danger mt-2">
                                    <span>{{ errors.stock[0] }}</span>
                                </div>
                            </div>
                            <!-- <div class="mb-3">
                                <label class="form-label fw-bold">Product Brand</label>
                                <input type="text" class="form-control" v-model="brand" placeholder="Product brand"
                                    min="100">
                                <div v-if="errors.brand" class="alert alert-danger mt-2">
                                    <span>{{ errors.brand[0] }}</span>
                                </div>
                            </div> -->
                            <div class="mb-3 cbbrand">
                                <label class="form-label fw-bold">Product Brand</label>
                                <select class="form-select" aria-label="Default select example" v-model="cbbrand">
                                    <option value="" selected disabled>Please select one brand</option>
                                    <option v-for="(data_brand) in data_brand" value="{{ data_brand.brand }}">
                                        {{ data_brand.brand }}
                                    </option>
                                </select>
                                <div v-if="errors.cbbrand" class="alert alert-danger mt-2">
                                    <span>{{ errors.cbbrand[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3 cbbrand">
                                <label class="form-label fw-bold">Product Category</label>
                                <select class="form-select" aria-label="Default select example" v-model="cbcategory">
                                    <option value="" selected disabled>Please select one category</option>
                                    <option v-for="(data_category) in data_category" value="{{ data_category.category }}">
                                        {{ data_category.category }}
                                    </option>
                                </select>
                                <div v-if="errors.cbcategory" class="alert alert-danger mt-2">
                                    <span>{{ errors.cbcategory[0] }}</span>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-md btn-primary rounded-sm shadow border-0">Ahay</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>