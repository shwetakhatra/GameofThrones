<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top" style="background-color: #b50008;">
    <div class="container">
      <router-link class="navbar-brand text-white" to="/">Game of Thrones</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="toggleMenu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div :class="{ 'show': isMenuOpen }" class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/">Houses</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/persons">Persons</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/quotes">Quotes</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'Navbar',
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
}
</script>
