<template>
  <div class="container" style="padding: 60px 15px 0;">
    <Table title="Quotes" :columns="quoteColumns" v-model:search-term="searchTerm" :rows="filteredQuotes"/>
    <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-danger" @click="fetchQuotes">
        Load new quotes
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Table from '../components/Table.vue'
export default {
  name: 'Quotes',
  data() {
    return {
      quotes: [],
      searchTerm: '',
      quoteColumns: [
        { key: 'sentence', label: 'Sentence' },
        { key: 'characterName', label: 'Person Name' },
        { key: 'characterHouse', label: 'House' },
      ],
    };
  },
  components: {
    Table,
  },
  computed: {
    filteredQuotes() {
      const searchTerm = this.searchTerm.toLowerCase();
      return this.quotes.filter(quote => quote.sentence.toLowerCase().includes(searchTerm));
    },
  },
  async mounted() {
    this.fetchQuotes();
  },
  methods: {
    async fetchQuotes() {
      try {
        const response = await this.$axios.get('/api/v1/random/5');
        this.quotes = response.data || [];
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    },
  },
};
</script>
