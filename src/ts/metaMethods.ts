import  { context, Rem,validRem } from 'remnote-api';
import { getContext, updateRem, remByName, getRem, getConfig, createRem } from './apiMethods';
import { setupTable } from './tableMethods';

export const SPLIT_CHAR = ":"

export const getMainTag = async (gc:typeof getContext,rbn:typeof remByName) => {
    const context = await gc()
    return await rbn("RemTable" + SPLIT_CHAR + context.remId)
}

export const getMainTagWrapper = async () => {
    return await getMainTag(getContext,remByName)
}

export const findConfigOption = async (gr:typeof getRem,rem:Rem,target:string) => {
    if (rem.found !== true) return undefined 
    const children = await Promise.all(rem.children.map(async id => await gr(id))) as validRem[]

    //find Existing
    for (const node of children) {
        if (node.nameAsMarkdown.length > 0) {
            const newName = node.nameAsMarkdown.split(SPLIT_CHAR)[0]
            if (newName == target) return node 
        }
    }

    return undefined 
}

export const updateRemTemplate = async (node:Rem,ur:typeof updateRem,template:string) => {
    if (node.found == true) await ur(node._id, {"name":"Template" + SPLIT_CHAR + template})
}

export const updateRemTemplateWrapper = async (node:Rem,template:string) => {
    updateRemTemplate(node,updateRem,template)
}

export const getParent = async (cr:typeof createRem,gcontext:context,remID:Rem,settings:validRem) => {
    return remID.found == true ? remID._id : 
    (await cr("RemTable" + SPLIT_CHAR + gcontext.remId, settings._id)).remId
}

export const saveSearch = async (template:string) => {
    const context = await getContext()
    const remID = await getMainTagWrapper()
    const settings = await  getConfig() as validRem
    const parentID = await getParent(createRem,context,remID,settings)

    //Save Template Name 
    const rem = await getRem(parentID)
    updateRemTemplateWrapper(rem,template)

}

export const search = async (template:string) => {
    await saveSearch(template)
    await setupTable(template)
}

