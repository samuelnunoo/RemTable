<template>
    <v-row>
        <h2> Tags </h2>
        <v-spacer/>
        <v-autocomplete
            v-model="values"
            :items="items"
            rounded
            solo
            multiple
            deletable-chips
            clearable
            auto-select-first
        />

    </v-row>
    
</template>

<script>
export default {
    data() {
        return {
            values: [],
            items: ["car","soup","cat"]
        }
    }
}
</script>