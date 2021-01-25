<template lang="pug">
    <v-card>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        />
        



    </v-card>
    
    <!-- Search Bar -->

    <!-- Sepparator -->

    <!-- List Menu --> 

</template>

<script>
export default {
    data() {
        return {
            search: '',

        }
    }
}
</script>