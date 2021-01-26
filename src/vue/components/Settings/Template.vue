import RemNoteAPI from 'remnote-api';
<template>
    <v-row>
        <h2> Template: </h2>
        <v-spacer/>
        
        <v-autocomplete
            style = "width: 50%"
            v-model="value"
            :items="entries"
            rounded
            solo
            clearable
            auto-select-first
        /> 
    </v-row>
</template>

<script lang='ts'>
import Vue from "vue"
import { getTemplates } from '../../../ts/setupMethods';


export default Vue.extend({
    name:"Template",
    data() {
        return {
            value: undefined,
            entries: [] as string[]
             }
    },
    mounted () {
        const init = async () => {
            const templates = await getTemplates()
            this.entries = templates 
        }

        init()
       
    }
})

</script>