<template>
    <div class="container" style="padding: 60px 15px 0;">
      <div v-if="loading" class="loader-overlay">
        <div class="spinner-border text-danger" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
      <div v-else>
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
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'

  interface House {
    name: string;
    slug: string;
    members: { name: string }[];
  }

  export default defineComponent({
    name: 'HouseDetails',
    data() {
      return {
        house: [] as House[],
        loading: false,
      };
    },
    async mounted() {
      const slug = this.$route.params.slug;
      try {
        this.loading = true; 
        const response = await (this as any).$axios.get(`/api/v1/house/${slug}`);
        this.house = response.data || {};
      } catch (error) {
        console.error('Error fetching house details:', error);
      } finally {
        this.loading = false;
      }
    },
  });
  </script>
  