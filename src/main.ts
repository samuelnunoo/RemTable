//Common Helper Methods
import RemNoteAPI from "../remnote-api/RemNoteAPI.js"

async function getRem(id) {
  const context = await RemNoteAPI.v0.get(id)
  return context
}
async function resolve(data) {
  return await Promise.all(data)
}
async function createRem(name,parent) {
  return await RemNoteAPI.v0.create(name, parent)
}
async function remByName(name) {
return await RemNoteAPI.v0.get_by_name(name)
}
