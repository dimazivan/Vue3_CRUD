<template>
    <div class="dashboard" style="margin-top:80px">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            MAIN MENU
                            <hr>
                            <ul class="list-group">
                                <router-link :to="{ name: 'dashboard.index' }"
                                    class="list-group-item text-dark text-decoration-none">DASHBOARD</router-link>
                                <li @click="logout" class="list-group-item text-dark text-decoration-none"
                                    style="cursor:pointer">LOGOUT</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-body">
                            DASHBOARD
                            <hr>
                            Selamat Datang <strong>{{ user.first_name }}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'Dashboard',
    data() {
        return {
            //state loggedIn with localStorage
            loggedIn: localStorage.getItem('loggedIn'),
            //state token
            token: localStorage.getItem('token'),
            //state user logged In
            user: []
        }
    }, created() {
        // if (localStorage.getItem('loggedIn') == true) {
        axios.get('http://localhost:8000/api/profile', { headers: { 'Authorization': 'Bearer ' + this.token } })
            .then(response => {
                if (localStorage.getItem('token') != null) {
                    console.log(response)
                    console.log(localStorage.getItem('loggedIn'))
                    console.log(localStorage.getItem('token'))
                    this.user = response.data // assign response to state user
                }
            })
        // }
    },
    methods: {
        logout() {
            axios.get('http://localhost:8000/api/logout')
                .then(() => {
                    //remove localStorage
                    localStorage.removeItem("loggedIn")
                    localStorage.removeItem("token")
                    //redirect
                    return this.$router.push({ name: 'login' })
                })
        }
    },
    //check user logged in or not
    mounted() {
        if (!this.loggedIn) {
            return this.$router.push({ name: 'login' })
        }
    },
}
</script>