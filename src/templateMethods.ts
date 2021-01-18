const { getPreEmitDiagnostics } = require("typescript")









const getTemplates = async () => {
  const template = await RemNoteAPI.v0.get_by_name("RemTable:Template")

  if (template) {
      return await Promise.all(template.tags.map(async id => getRem(id)))
        .filter(rem => rem.name.length == 1 && typeof rem.name[0] == "string")
        .map(rem => rem.name[0])
  }
  return []


}