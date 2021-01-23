
<template lang="pug">
    <VueTabulator v-model="values" :options="options" />
</template>

<script>
export default {
    data() {
        return {
            values: [{name:"Testing"},{name:"Testing2"}],
            options: {
                columns:[{
                    title:"Name",
                    field:'name'
                }]
            }
        }
    }
}
</script>

<style lang='scss'>
 
    @import "~vue-tabulator/dist/scss/bootstrap/tabulator_bootstrap4";
 
</style>