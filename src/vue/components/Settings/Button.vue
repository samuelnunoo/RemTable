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
       
            <type/>
            <component :is = "comptype" />
            <v-row>
              <v-btn  @click="onSubmit" color ="blue" dark> Submit </v-btn>
            </v-row>
            

          </v-container>
          <v-divider/>
        </v-card>
     </v-menu>
</template>

<script lang='ts'>
import Type from "./Type.vue"
import Template from "./Template.vue"
import Tags from "./Tags.vue"
import Vue from "vue"
import { setupTable } from '../../../ts/tableMethods';

export default Vue.extend({    
    name: "settings-button",
    components: {
        "type":Type as any,
        "table-item":Template as any,
        "list-item":Tags as any 
    },
    data() {
        return {
                menu: false,
        }
    },
    computed: {
      comptype: function () {
        return this.$store.getters.getType

      }

    },
    methods:{
      onSubmit: async function () {
        this.$data.menu = false 
        const type = this.$store.getters.getType 

        if (type == 'table-item') {
          const template = this.$store.getters.getTemplate
          const {data,options} = await setupTable(template)

          this.$store.commit('setData',data)
          this.$store.commit('setOptions',options)

          
        }
     
      },
    }

})

</script>