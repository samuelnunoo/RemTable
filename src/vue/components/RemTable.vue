<template>
<v-container>
    <v-row>
            <v-toolbar>
                <v-spacer/>
                 <settings-button/>
            </v-toolbar>
            <VueTabulator v-model="data" :options="options"/>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import Settings  from "../components/Settings/Button"
import Type from "../components/Settings/Type"
export default {
    components:{
        "settings-button":Settings,
        "type":Type,
    },
    computed: {
        data: function () {
            return this.$store.getters.getData 
        },
        options: function() {
            return this.$store.getters.getOptions
        }
    }
}
</script>

<style lang='scss'>
    @import "~vue-tabulator/dist/scss/bootstrap/tabulator_bootstrap4";
</style>