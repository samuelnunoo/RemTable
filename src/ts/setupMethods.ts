import RemNoteAPI, { validRem } from "remnote-api"
import { getRem } from './main';


export const getMetaData = async () => {
  const document = await RemNoteAPI.v0.get_by_name("com.panopticon.remtable")
  const map = new Map() 

  if (document.found == true) {
    // to get child Data
    const newData = await Promise.all(document.children.map(async id => await getRem(id))) as validRem[]
    const mapped = await Promise.all(newData.map( async rem => {
      const promises = await Promise.all(rem.children.map(async id => getRem(id)))
      rem.children = promises.map(child => ((child as validRem).nameAsMarkdown))
      return rem
    }))

    // to convert to Map
    for (const table of mapped) {
      map.set(table.nameAsMarkdown,table.children)
    }
    return map 
 

  }

  return false 

}
export const createMetaData = () => {
  RemNoteAPI.v0.create("com.panopticon.remtable",undefined,{"isDocument":true})

}
export const getTemplates = async () => {
  const template = await RemNoteAPI.v0.get_by_name("RemTable:Template")

  if (template.found !== true) return []

  const data = await Promise.all(template.tagChildren.map(async id => await getRem(id))) as validRem[]
  return data.map( rem => rem.nameAsMarkdown)

}
export const extractTemplate = (data:string[]) => {
  const template = data.filter(item => item.split(":")[0] == "Template")
  return template[0].split(":")[1]

}


//@todo fix this 

/*
export const setup = async () => {
  //getContext
  const context = await RemNoteAPI.v0.get_context()
  const metaData = await getMetaData() 

  if (metaData) {
    const data = metaData.get("RemTable:" + context.remId)
    if (data) {
      const template = extractTemplate(data)
      setupTable(template)
    }
  }

  else createMetaData()

  

}

*/




