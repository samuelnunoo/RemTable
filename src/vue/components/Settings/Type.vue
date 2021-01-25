<template>
    <v-row>
        <h2> Type </h2>
        <v-spacer/>
        <v-btn-toggle
            v-model="toggle"
            rounded
        >
            <v-btn @click = "onSelect('table')"> Table </v-btn>
            <v-btn @click = "onSelect('list')" > List </v-btn>
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
            this.$emit('click',selection)
        }
    }
}


</script>