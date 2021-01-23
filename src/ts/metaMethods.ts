import RemNoteAPI, { Rem,RemNoteAPIv0,validRem } from 'remnote-api';
import { remByName, getRem, createRem } from './main';
import { setupTable } from './tableMethods';

export const getSettingsPage = async () => {
    return remByName("com.panopticon.remtable")
}
export const getMetaData = async () => {
    const context = await RemNoteAPI.v0.get_context()
    return await remByName("RemTable:" + context.remId)
}
export const updateRemTemplate = async (rem:Rem,template:string) => {
    if (rem.found !== true) return;

    const children = await Promise.all(rem.children.map(async id => await getRem(id))) as validRem[]
    
    //find Existing
    for (const node of children) {
        if (node.nameAsMarkdown.length > 0) {
            //@todo make the split criteria more unique like something no one uses 
            const newName = node.nameAsMarkdown.split(":")[0]
            
            if (newName == "Template") {
                //update 
                await RemNoteAPI.v0.update(node._id,{"name":"Template:" + template})
                return 
            }
        }
    }

}
export const saveSearch = async (template:string) => {
    const context = await RemNoteAPI.v0.get_context()
    const title = "Template:" + template
    const remID = await getMetaData()
    const settings = await getSettingsPage() as validRem
    let parent

    if (remID.found == true) parent = remID._id
    else {
        parent = await createRem("RemTable:" + context.remId, settings._id)
        parent = parent.remId
    }

    //Save Template Name 
    const rem = await getRem(parent)
    updateRemTemplate(rem,template)

}
export const search = async (template:string) => {
    await saveSearch(template)
    await setupTable(template)
}

