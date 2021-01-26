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
exports.search = exports.saveSearch = exports.updateRemTemplate = exports.getMetaData = exports.getSettingsPage = void 0;
const remnote_api_1 = __importDefault(require("remnote-api"));
const main_1 = require("./main");
const getSettingsPage = () => __awaiter(void 0, void 0, void 0, function* () {
    return main_1.remByName("com.panopticon.remtable");
});
exports.getSettingsPage = getSettingsPage;
const getMetaData = () => __awaiter(void 0, void 0, void 0, function* () {
    const context = yield remnote_api_1.default.v0.get_context();
    return yield main_1.remByName("RemTable:" + context.remId);
});
exports.getMetaData = getMetaData;
const updateRemTemplate = (rem, template) => __awaiter(void 0, void 0, void 0, function* () {
    if (rem.found !== true)
        return;
    const children = yield Promise.all(rem.children.map((id) => __awaiter(void 0, void 0, void 0, function* () { return yield main_1.getRem(id); })));
    //find Existing
    for (const node of children) {
        if (node.nameAsMarkdown.length > 0) {
            //@todo make the split criteria more unique like something no one uses 
            const newName = node.nameAsMarkdown.split(":")[0];
            if (newName == "Template") {
                //update 
                yield remnote_api_1.default.v0.update(node._id, { "name": "Template:" + template });
                return;
            }
        }
    }
});
exports.updateRemTemplate = updateRemTemplate;
const saveSearch = (template) => __awaiter(void 0, void 0, void 0, function* () {
    const context = yield remnote_api_1.default.v0.get_context();
    const title = "Template:" + template;
    const remID = yield exports.getMetaData();
    const settings = yield exports.getSettingsPage();
    let parent;
    if (remID.found == true)
        parent = remID._id;
    else {
        parent = yield main_1.createRem("RemTable:" + context.remId, settings._id);
        parent = parent.remId;
    }
    //Save Template Name 
    const rem = yield main_1.getRem(parent);
    exports.updateRemTemplate(rem, template);
});
exports.saveSearch = saveSearch;
const search = (template) => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.saveSearch(template);
    //@todo fix this  await setupTable(template)
});
exports.search = search;
//# sourceMappingURL=metaMethods.js.map