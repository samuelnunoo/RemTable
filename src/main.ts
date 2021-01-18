//Common Helper Methods
import RemNoteAPI from "remnote-api"

export const getRem = async (id:string) => {
  const context = await RemNoteAPI.v0.get(id)
  return context
}

export const createRem = async (name:string,parent:string) => {
  return await RemNoteAPI.v0.create(name, parent)
}
export const remByName = async (name:string) => {
return await RemNoteAPI.v0.get_by_name(name)
}
