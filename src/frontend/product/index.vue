<script setup>

//import ref and onMounted
import { ref, onMounted } from 'vue';

//import api
import api from '../../api';

//define state
const data_product = ref([]);

//method fetchDataProduct
const fetchDataProduct = async () => {

    //fetch data product
    await api.get('/api/api_product')
        .then(response => {
            //set response data to state "api_product"
            data_product.value = response.data.data
        });

    console.log(data_product);
}

//run hook "onMounted"
onMounted(() => {
    //call method "fetchDataProduct"
    fetchDataProduct();
});

//method delete data
const deleteData = async (id) => {

    //delete data with API
    await api.delete(`/api/api_product/${id}`)
        .then(() => {
            //call method "fetchDataProduct"
            fetchDataProduct();
        })

};

</script>

<template>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-12">
                <router-link :to="{ name: 'product.create' }" class="btn btn-md btn-success rounded shadow border-0 mb-3">
                    ADD NEW DATA
                </router-link>
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <table class="table table-bordered">
                            <thead class="bg-dark text-white">
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Description</th>
                                    <th scope="col" style="width:15%">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="data_product.length == 0">
                                    <td colspan="3" class="text-center">
                                        <div class="alert alert-danger mb-0">
                                            Data Belum Tersedia!
                                        </div>
                                    </td>
                                </tr>
                                <tr v-else v-for="(data_products, index) in data_product" :key="index">
                                    <td>{{ data_products.title }}</td>
                                    <td>{{ data_products.description }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name: 'product.edit', params: { id: data_products.id } }"
                                            class="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</router-link>
                                        <button @click.prevent="deleteData(data_products.id)"
                                            class="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>