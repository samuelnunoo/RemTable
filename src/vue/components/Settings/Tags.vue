<template>
    <v-row>
        <h2> Tags </h2>
        <v-spacer/>
        <v-autocomplete
            style = "max-width: 50%"
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

<script lang='ts'>
    import Vue from "vue"

    export default Vue.extend( {
        data() {
            return {
                values: [] as string[],
                items: [] as string[]
            }
        },

        //@todo figure out how to get all Tags 
        mounted() {
            const init = async () => {

            }
        }
    })


</script>