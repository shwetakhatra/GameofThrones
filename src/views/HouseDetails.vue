<template>
    <div class="container" style="padding: 60px 15px 0;">
      <h3 class="mt-4" v-if="house[0]">{{ house[0].name }}</h3>
      <div class="d-flex justify-content-end">
        <router-link to="/houses" class="btn btn-danger text-white">
          Back to houses
        </router-link>
    </div>
      <div class="card mt-5" style="width: 100%;" v-if="house[0]">
        <div class="card-body">
          <div class="form-group mt-3">
            <strong><label>Slug</label></strong>
            <input type="text" class="form-control mt-2" v-model="house[0].slug" disabled>
          </div>
          <div class="form-group mt-3">
            <strong><label class="font-bold">Members</label></strong>
            <template v-for="member in house[0].members" :key="member.name">
              <input type="text" class="form-control mt-2" v-model="member.name" disabled>
            </template>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    name: 'HouseDetails',
    data() {
      return {
        house: [],
      };
    },
    async mounted() {
      const slug = this.$route.params.slug;
      try {
        const response = await this.$axios.get(`/api/v1/house/${slug}`);
        this.house = response.data || {};
      } catch (error) {
        console.error('Error fetching house details:', error);
      }
    },
  };
  </script>
  