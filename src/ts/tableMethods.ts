import RemNoteAPI, { Rem, RemNoteAPIv0, validRem } from "remnote-api"
import { getRem } from "./main"

type rowType = [name:string,id:string,tags:string[],children:Rem[]]

export const nameMap = (columns:Rem[]) =>  {
    const map = new Map()
    columns.forEach( item => {
        if (item.found == true) {
            const id = item._id
            const name = item.name[0]
            map.set(id,name)
        }
   })
    return map
  }
export const getTemplate = async (name:string) => {
    return await RemNoteAPI.v0.get_by_name(name)
}
export const getRows = async (data:Rem) => {
    if (data.found !== true) return []

    const newData = await Promise.all(data.tagChildren.map(
        async id => await (getRem(id)
        )))

    return await getRowChildren(newData)

  
}
export const getData = async (template:string) => {
    const data = await getTemplate(template)
    const columns = await getColumns(data)
    const rows = await getRows(data) as rowType[]
    const table = formatData(columns,rows)
    const columnData = setupColumns(columns) as {title:string, field:string}[]

    return {data:table, columns:columnData}
 
}
export const setupColumns = (columns:Rem[]) => {
    const filtered = columns.filter( item => item.found == true && item.name[0] !== undefined)
    return filtered.map(item => {
        if (item.found == true) {
            const name = item.name[0]
            return {title: name, field: name}
        }
    })

}

export const setupTable = async(template:string) => {
    const {data,columns} = await getData(template)

    const options = {
        columns:[{title:"Name", field:"name",formatter:"link",formatterParams:{
        labelField:"name",
        urlPrefix:"https://www.remnote.io/document/",
        urlField:"_id",
        target:"_blank"
      }}, {title:"Tags",field:"_tags"} ,...columns]}

      return {data, options}

      //@todo add in other options to vue settings 
    /*const table = new Tabulator("#example", {
        height: 205,
        data,
        layout: "fitColumns",
        tooltips:true,
        movableColumns:true,
        resizableRows: true,
        columns: [{title:"Name", field:"name",formatter:"link",formatterParams:{
            labelField:"name",
            urlPrefix:"https://www.remnote.io/document/",
            urlField:"_id",
            target:"_blank"
          }}, {title:"Tags",field:"_tags"} ,...columns]
    })
    */

}


export const getRowChildren = async (data:Rem[]) => {
   return await Promise.all(data.map( async item => {
        if (item.found == false) return []

        const children = await Promise.all(item.children.map( async id => getRem(id)))
        const tags = await Promise.all(item.tagParents.map(async id => getRem(id)))
        const newTags = tags.filter(tag => tag.found == true)
            .map(tag => (tag as validRem).nameAsMarkdown)

        return [item.nameAsMarkdown,item._id,newTags,children] as rowType
    }))

}
export const getColumns = async (data:Rem) => {
    if (data.found !== true) return []
    const newData = await Promise.all(data.children.map( async id => await getRem(id)))
    return newData.filter(item => item.found == true && item.remType == "slot")
}
export const formatData = (columns:Rem[],rows:rowType[]) => {
    const map = nameMap(columns)

    return rows.map(item => {
        const data = {
            "name":item[0],
            "_id": item[1],
            "_tags": item[2]
        }

        for (const rem of item[3]) {
            if (rem.found) {
                const name = rem.nameAsMarkdown
                if (map.get(name)) data[name] = rem.contentAsMarkdown
            }
        }

        console.log(data)
        return data 
    })

}

    

    
  
    
  