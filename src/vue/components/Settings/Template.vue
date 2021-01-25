<template>
    <v-row>
        <h2> Template: </h2>
        <v-spacer/>
        
        <v-autocomplete
            v-model="value"
            :items="entries"
            rounded
            solo
            clearable
            auto-select-first
        /> 
    </v-row>
</template>

<script>
export default {
    name: "table-item",
    data() {
        return {
            value: undefined,
            entries: ['testing','cars']

        }
    }
    
}
</script>