<template>
   <v-menu
        v-model = "menu"
        :close-on-content-click = "false"
        :nudge-width = "200"
        offset-x
    >
        <template v-v-slot:activator="{ on, attrs }">
            <v-btn
                color = "indigo"
                dark
                v-bind= "attrs"
                v-on = "on"
            >
                Sort
            </v-btn>
        </template>

        <v-card>
            <v-list>
                <v-list-item>
                    <

            </v-list>

            <v-divider/>
            <

        </v-card>


   </v-menu>
    
    
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>