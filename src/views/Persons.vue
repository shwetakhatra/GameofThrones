<template>
  <div class="container" style="padding: 60px 15px 0;">
    <div v-if="loading" class="loader-overlay">
      <div class="spinner-border text-danger" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
    <div v-else>
      <Table title="Persons" :columns="personColumns" v-model:search-term="searchTerm" :rows="filteredPersons"/>
    </div>
  </div>
</template>

<script lang="ts">
import Table from '../components/Table.vue'
import { defineComponent } from 'vue'

interface Person {
  name: string;
  house: string;
}

export default defineComponent({
  name: 'Persons',
  data() {
    return {
      persons: [] as Person[],
      searchTerm: '',
      loading: false,
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
        this.loading = true;
        const response = await (this as any).$axios.get('/api/v1/characters');
        this.persons = response.data || [];
      } catch (error) {
        console.error('Error fetching persons:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>
