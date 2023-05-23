<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div class="container">
        <router-link :to="{ name: 'home' }" class="navbar-brand">HOME</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link :to="{ name: 'product.index' }" class="nav-link active" aria-current="page">
                DATA
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'product.create' }" class="nav-link active" aria-current="page">
                TAMBAH DATA
              </router-link>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0" role="search">
            <a href="https://github.com/dimazivan" target="_blank" class="btn btn-success">Kamu nanya</a>
          </ul>
          <div class="form-inline my-2 my-lg-0">
            <router-link :to="{ name: 'login' }" v-if="!loggedIn" class="btn btn-primary my-2 my-sm-0">LOGIN</router-link>
          </div>
        </div>
      </div>
    </nav>

    <!--- render router view -->
    <router-view></router-view>

  </div>
</template>
<script>
export default {
  name: 'App',

  data() {
    return {
      loggedIn: null
    }
  },

  methods: {
    getLoggedIn() {
      this.loggedIn = localStorage.getItem("loggedIn")
    }
  },

  watch: {
    $route: {
      immediate: true,
      handler() {
        this.getLoggedIn()
      }
    }
  },

}
</script>