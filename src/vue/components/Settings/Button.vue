<template>
     <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">


            
          <v-btn
            v-bind="attrs"
            v-on="on"
            icon
          >
           <v-icon> mdi-dots-vertical </v-icon>
          </v-btn>
        </template>
  
        <v-card
        style="padding:50px"
            min-height = "200"
        >
          <v-container>
            <!--  <type @click="onSelect"/> -->
            <!-- <component :is="comptype" /> -->
       
            <type @click="onSelect" />
            <component :is = "comptype" />


          </v-container>
          <v-divider/>
        </v-card>
     </v-menu>
</template>

<script>
import Type from "./Type"
import Template from "./Template"
import Tags from "./Tags"

export default {
    name: "settings-button",
    components: {
        "type":Type,
        "table-item":Template,
        "list-item":Tags 
    },
    data() {
        return {
                comptype:"table-item",
                menu: false,
                message: false,
                hints: true,
        }
    },
    methods:{
      onSelect: function (value) {
        this.comptype = value
      }
    }
}
</script>