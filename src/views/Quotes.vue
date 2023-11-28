<template>
  <div class="container" style="padding: 60px 15px 0;">
    <div v-if="loading" class="loader-overlay">
      <div class="spinner-border text-danger" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
    <div v-else>
    <Table title="Quotes" :columns="quoteColumns" v-model:search-term="searchTerm" :rows="filteredQuotes"/>
      <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-danger" @click="fetchQuotes">
          Load new quotes
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Table from '../components/Table.vue'
import { defineComponent } from 'vue'

interface Quote {
  sentence: string;
  characterName: string;
  characterHouse: string;
}

export default defineComponent({
  name: 'Quotes',
  data() {
    return {
      quotes: [] as Quote[],
      searchTerm: '',
      loading: false,
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
        this.loading = true; 
        const response = await (this as any).$axios.get('/api/v1/random/5');
        this.quotes = response.data || [];
      } catch (error) {
        console.error('Error fetching quotes:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>
