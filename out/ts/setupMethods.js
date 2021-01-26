"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTemplate = exports.getTemplates = exports.createMetaData = exports.getMetaData = void 0;
const remnote_api_1 = __importDefault(require("remnote-api"));
const main_1 = require("./main");
const getMetaData = () => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield remnote_api_1.default.v0.get_by_name("com.panopticon.remtable");
    const map = new Map();
    if (document.found == true) {
        // to get child Data
        const newData = yield Promise.all(document.children.map((id) => __awaiter(void 0, void 0, void 0, function* () { return yield main_1.getRem(id); })));
        const mapped = yield Promise.all(newData.map((rem) => __awaiter(void 0, void 0, void 0, function* () {
            const promises = yield Promise.all(rem.children.map((id) => __awaiter(void 0, void 0, void 0, function* () { return main_1.getRem(id); })));
            rem.children = promises.map(child => (child.nameAsMarkdown));
            return rem;
        })));
        // to convert to Map
        for (const table of mapped) {
            map.set(table.nameAsMarkdown, table.children);
        }
        return map;
    }
    return false;
});
exports.getMetaData = getMetaData;
const createMetaData = () => {
    remnote_api_1.default.v0.create("com.panopticon.remtable", undefined, { "isDocument": true });
};
exports.createMetaData = createMetaData;
const getTemplates = () => __awaiter(void 0, void 0, void 0, function* () {
    const template = yield remnote_api_1.default.v0.get_by_name("RemTable:Template");
    if (template.found !== true)
        return [];
    const data = yield Promise.all(template.tagChildren.map((id) => __awaiter(void 0, void 0, void 0, function* () { return yield main_1.getRem(id); })));
    return data.map(rem => rem.nameAsMarkdown);
});
exports.getTemplates = getTemplates;
const extractTemplate = (data) => {
    const template = data.filter(item => item.split(":")[0] == "Template");
    return template[0].split(":")[1];
};
exports.extractTemplate = extractTemplate;
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
//# sourceMappingURL=setupMethods.js.map