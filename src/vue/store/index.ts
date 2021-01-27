import Vue from "vue"
import Vuex from "vuex"


Vue.use(Vuex)

const store = new Vuex.Store( {
    state: {
        type: "table-item" as "table" | "tag",
        template: "" as string,
        tags: [] as string[],
        data: [{name:"Test"},{name:"Test2"}],
        options: {
            columns:[{title:"Name",field:"name"}]

        }
        
    },

    mutations: {
        setType (state,type) {
            state.type = type
        },

        setTemplate (state,value:string) {
            state.template = value
        },

        setTags (state,tags:string[]) {
            state.tags = tags 
        },

        setData (state,data) {
            console.log("v1",state.data)
            for (let i = 0; i < data.length; i++) {
    
                Vue.set(state.data,i,data[i])
            }

            console.log("data",state.data)
        },

        setOptions (state, options) {
            state.options = options 
        }
    },
    getters: {
        getType: state => state.type,
        getTags: state => state.tags,
        getTemplate: state => state.template,
        getData: state => state.data,
        getOptions: state => state.options
    }
})

export default store 