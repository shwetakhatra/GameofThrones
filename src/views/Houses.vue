<template>
  <div class="container" style="padding: 60px 15px 0;">
    <Table title="Houses" :columns="houseColumns" v-model:search-term="searchTerm" :rows="filteredHouses"/>
  </div>
</template>

<script lang="ts">
import Table from '../components/Table.vue'
export default {
  name: 'Houses',
  data() {
    return {
      houses: [],
      searchTerm: '',
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
        const response = await this.$axios.get('/api/v1/houses');
        this.houses = response.data || [];
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    },
  },
};
</script>
