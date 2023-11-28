<template>
  <div class="container" style="padding: 60px 15px 0; position: relative;">
    <div v-if="loading" class="loader-overlay">
      <div class="spinner-border text-danger" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
    <div v-else>
      <Table title="Houses" :columns="houseColumns" v-model:search-term="searchTerm" :rows="filteredHouses"/>
    </div>
  </div>
</template>

<script lang="ts">
import Table from '../components/Table.vue'
import { defineComponent } from 'vue'

interface House {
  name: string;
  members: { name: string }[];
}

export default defineComponent({
  name: 'Houses',
  data() {
    return {
      houses: [] as House[],
      searchTerm: '',
      loading: false,
      houseColumns: [
        { key: 'housename', label: 'House Name' },
        { key: 'members', label: 'Members' },
      ],
    };
  },
  components: {
    Table,
  },
  computed: {
    filteredHouses() {
      const searchTerm = this.searchTerm.toLowerCase();
      return this.houses.filter(house => house.name.toLowerCase().includes(searchTerm));
    },
  },
  async mounted() {
    this.fetchHouses();
  },
  methods: {
    async fetchHouses() {
      try {
        this.loading = true; 
        const response = await (this as any).$axios.get('/api/v1/houses');
        this.houses = response.data || [];
      } catch (error) {
        console.error('Error fetching houses:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>
