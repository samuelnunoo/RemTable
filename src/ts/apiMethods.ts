//Common Helper Methods
import  RemNoteAPI  from "remnote-api"
const CONFIG = "com.samuelnunoo.remtable"

export const getRem = async (id:string) => {
  return await RemNoteAPI.v0.get(id)
}

export const createRem = async (name:string,parent:string) => {
  return await RemNoteAPI.v0.create(name, parent)
}

export const remByName = async (name:string) => {
  return await RemNoteAPI.v0.get_by_name(name)
}

export const getTemplate =  async (name:string) => {
  return await RemNoteAPI.v0.get_by_name(name)
}

export const createConfig = async () => {
  return await RemNoteAPI.v0.create(CONFIG,undefined,{"isDocument":true})
}

export const getConfig = async () => {
  return await RemNoteAPI.v0.get_by_name(CONFIG)
}

export const getContext = async () => {
  return await RemNoteAPI.v0.get_context()
}

export const updateRem = async (remid:string,options?:RemNoteAPI.options) => {
    await RemNoteAPI.v0.update(remid,options)
}