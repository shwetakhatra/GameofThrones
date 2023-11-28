<template>
    <div class="container" style="padding: 60px 15px 0;">
        <div v-if="loading" class="loader-overlay">
            <div class="spinner-border text-danger" role="status">
            <span class="sr-only"></span>
            </div>
        </div>
        <div v-else>
            <h3 class="mt-4" v-if="personDetails[0]">{{ personDetails[0].name }}</h3>
            <div class="d-flex justify-content-end">
                <router-link to="/persons" class="btn btn-danger text-white">
                Back to persons
                </router-link>
            </div>
            <div class="card mt-5 mb-5" style="width: 100%;" v-if="personDetails[0]">
                <div class="card-body">
                <div class="form-group mt-3">
                    <strong><label>Slug</label></strong>
                    <input type="text" class="form-control mt-2" v-model="personDetails[0].slug" disabled>
                </div>
                <div class="form-group mt-3">
                    <strong><label>House</label></strong>
                    <input type="text" class="form-control mt-2" v-model="personDetails[0].house.name" disabled>
                </div>
                <div class="form-group mt-3">
                    <strong><label class="font-bold">Quotes</label></strong>
                    <template v-for="quote in personDetails[0].quotes" :key="quote" v-if="newQuotes && newQuotes.length === 0">
                        <p class="mt-2"><i>"{{ quote }}"</i></p>
                    </template>
                    <template v-else v-for="quote in newQuotes" :key="1">
                        <p class="mt-2"><i>"{{ quote.sentence }}"</i></p>
                    </template>
                </div>
                    <div class="d-flex justify-content-end">
                        <button type="button" class="btn btn-danger" @click="replaceQuotes()">
                            Replace quotes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
<script lang="ts">
import { defineComponent } from 'vue'

interface Person {
    name: string;
    slug: string;
    house: {
        name: string;
    };
    quotes: string[];
}

export default defineComponent({
    name: 'HouseDetails',
    data() {
        return {
            personDetails: []  as Person[],
            newQuotes: [] as { sentence: string }[],
            loading: false,
        };
    },
    async mounted() {
        this.fetchPersonDetails();
    },
    methods:{
        async fetchPersonDetails() {
            const slug = this.$route.params.slug;
            try {
                this.loading = true;
                const response = await (this as any).$axios.get(`/api/v1/character/${slug}`);
                this.personDetails = response.data || {};
            } catch (error) {
                console.error('Error fetching person details:', error);
            } finally {
                this.loading = false;
            }
        },
        async replaceQuotes(){
            const slug = this.$route.params.slug;
            try {
                this.loading = true;
                const response = await (this as any).$axios.get(`/api/v1/author/${slug}/5`);
                this.newQuotes = response.data || {};
            } catch (error) {
                console.error('Error fetching person details:', error);
            } finally {
                this.loading = false;
            }
        }
    }
});
</script>
  