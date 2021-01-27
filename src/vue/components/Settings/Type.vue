<template>
    <v-row
        style = "padding-bottom: 10px;"
    >
        <h2> Type </h2>
        <v-spacer/>
        <v-btn-toggle
            v-model="toggle"
            rounded
        >
            <v-btn @click = "onSelect('table-item')"> Table </v-btn>
            <v-btn @click = "onSelect('list-item')" > List </v-btn>
        </v-btn-toggle>
    </v-row>
</template>

<script>
export default {

    data() {
        return {
            toggle: 0,
        }
    },

    methods: {
        onSelect: function (selection) {
            this.$store.commit('setType', selection)
        }
    }
}


</script>