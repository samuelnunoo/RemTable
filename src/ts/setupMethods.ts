import  { validRem } from "remnote-api"
import { getRem, getConfig, remByName } from './apiMethods';



export const getMetaData = async (gc:typeof getConfig, gr: typeof getRem) => {
  const document = await gc()
  const map = new Map() 

  if (document.found == true) {
    // to get child Data
    const newData = await Promise.all(document.children.map(async id => await gr(id))) as validRem[]
    const mapped = await Promise.all(newData.map( async rem => {
      const promises = await Promise.all(rem.children.map(async id => gr(id)))
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

export const getMetaDataWrapper = async () => {
  return await getMetaData(getConfig,getRem)
}

export const getTemplatesWrapper = async () => {
  return await getTemplates(remByName,getRem)

}

export const getTemplates = async (rbn:typeof remByName, gr: typeof getRem) => {
  const template = await rbn("RemTable:Template")
  if (template.found !== true) return []
  const data = await Promise.all(template.tagChildren.map(async id => await gr(id))) as validRem[]
  return data.map( rem => rem.nameAsMarkdown)

}

export const extractTemplate = (data:string[]) => {
  const template = data.filter(item => item.split(":")[0] == "Template")
  return template.length > 0 ? template[0].split(":")[1] : ""

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




