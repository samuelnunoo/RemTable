<template>
<v-container>
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
</v-container>

    
</template>

<script lang='ts'>
import Vue from "vue"
import { getTemplates } from '../../../ts/setupMethods';


export default Vue.extend({
    name:"Template",
    computed: {
        value: {
            get() {
                return this.$store.getters.getTemplate 
            },
            set(value) {
                this.$store.commit('setTemplate',value)
            }
        }
    },
    data() {
        return {
            entries: [] as string[]
             }
    },
  
    mounted () {
        const init = async () => {
            try {
                const templates = await getTemplates()
                this.entries = templates 
            }

            catch {
                this.entries = ["test1","test2","test3"]
            }
         
        }

        init()
       
    }
})

</script>