<template>
  <div class="container" style="padding: 60px 15px 0;">
    <Table title="Persons" :columns="personColumns" v-model:search-term="searchTerm" :rows="filteredPersons"/>
  </div>
</template>

<script lang="ts">
import Table from '../components/Table.vue'
export default {
  name: 'Persons',
  data() {
    return {
      persons: [],
      searchTerm: '',
      personColumns: [
        { key: 'name', label: 'Person Name' },
        { key: 'house', label: 'House' },
      ],
    };
  },
  components: {
    Table,
  },
  computed: {
    filteredPersons() {
      const searchTerm = this.searchTerm.toLowerCase();
      return this.persons.filter(person => person.name.toLowerCase().includes(searchTerm));
    },
  },
  async mounted() {
    this.fetchPersons();
  },
  methods: {
    async fetchPersons() {
      try {
        const response = await this.$axios.get('/api/v1/characters');
        this.persons = response.data || [];
      } catch (error) {
        console.error('Error fetching persons:', error);
      }
    },
  },
};
</script>
