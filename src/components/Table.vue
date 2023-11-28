<template>
    <h3 class="mt-4">{{ title }}</h3>
    <div class="d-flex justify-content-end">
        <input
            :value="searchTerm"
            @input="updateSearchTerm"
            type="text"
            class="my-1 p-2 border rounded"
            :placeholder="'Search by ' + title"
        />
    </div>
    <table class="table table-striped">
        <thead>
        <tr>
            <th v-for="column in columns" :key="column.key" scope="col">
                {{ column.label }}
            </th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="row in rows" :key="row.name">
                <td v-for="column in columns" :key="column.key" scope="row">
                    <template v-if="column.key === 'members'">
                        {{ row[column.key].map((member: any) => member.name).join(', ') }}
                    </template>
                    <template v-else-if="column.key === 'house' && row.house">
                        {{ row.house.name }}
                    </template>
                    <template v-else-if="column.key === 'characterName' && row.character">
                        {{ row.character.name }}
                    </template>
                    <template v-else-if="column.key === 'characterHouse' && row.character.house">
                        {{ row.character.house.name }}
                    </template>
                    <template v-else-if="column.key === 'housename'">
                        <router-link :to="'/house/'+row.slug">{{ row.name }}</router-link>
                    </template>
                    <template v-else-if="column.key === 'name'">
                        <router-link :to="'/person/'+row.slug">{{ row.name }}</router-link>
                    </template>
                    <template v-else>
                        {{ row[column.key] }}
                    </template>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps(
    [
        'title',
        'searchTerm',
        'columns',
        'rows'
    ]
);
const emit = defineEmits();
const searchTerm = ref('');
const searchPlaceholder = ref('');

const updateSearchTerm = (event: Event) => {
    searchTerm.value = (event.target as HTMLInputElement).value;
    emit('update:searchTerm', searchTerm.value);
};

watch(
  () => props.title,
  (newTitle) => {
    searchPlaceholder.value = newTitle ? newTitle : 'Default Placeholder';
  }
);

</script>