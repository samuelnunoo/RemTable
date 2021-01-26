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
exports.formatData = exports.getColumns = exports.getRowChildren = exports.setupColumns = exports.getData = exports.getRows = exports.getTemplate = exports.nameMap = void 0;
const remnote_api_1 = __importDefault(require("remnote-api"));
const main_1 = require("./main");
const nameMap = (columns) => {
    const map = new Map();
    columns.forEach(item => {
        if (item.found == true) {
            const id = item._id;
            const name = item.name[0];
            map.set(id, name);
        }
    });
    return map;
};
exports.nameMap = nameMap;
const getTemplate = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield remnote_api_1.default.v0.get_by_name(name);
});
exports.getTemplate = getTemplate;
const getRows = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.found !== true)
        return [];
    const newData = yield Promise.all(data.tagChildren.map((id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield (main_1.getRem(id));
    })));
    return yield exports.getRowChildren(newData);
});
exports.getRows = getRows;
const getData = (template) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield exports.getTemplate(template);
    const columns = yield exports.getColumns(data);
    const rows = yield exports.getRows(data);
    const table = exports.formatData(columns, rows);
    const columnData = exports.setupColumns(columns);
    return { data: table, columns: columnData };
});
exports.getData = getData;
const setupColumns = (columns) => {
    const filtered = columns.filter(item => item.found == true && item.name[0] !== undefined);
    return filtered.map(item => {
        if (item.found == true) {
            const name = item.name[0];
            return { title: name, field: name };
        }
    });
};
exports.setupColumns = setupColumns;
/*
export const setupTable = async(template:string) => {
    const {data,columns} = await getData(template)

    //@todo figure this out
    const table = new Tabulator("#example", {
        height: 205,
        data,
        layout: "fitColumns",
        tooltips:true,
        movableColumns:true,
        resizableRows: true,
        columns: [{title:"Name", field:"name",formatter:"link",formatterParams:{
            labelField:"name",
            urlPrefix:"https://www.remnote.io/document/",
            urlField:"_id",
            target:"_blank"
          }}, {title:"Tags",field:"_tags"} ,...columns]
    })

}

*/
const getRowChildren = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Promise.all(data.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        if (item.found == false)
            return [];
        const children = yield Promise.all(item.children.map((id) => __awaiter(void 0, void 0, void 0, function* () { return main_1.getRem(id); })));
        const tags = yield Promise.all(item.tagParents.map((id) => __awaiter(void 0, void 0, void 0, function* () { return main_1.getRem(id); })));
        const newTags = tags.filter(tag => tag.found == true)
            .map(tag => tag.nameAsMarkdown);
        return [item.nameAsMarkdown, item._id, newTags, children];
    })));
});
exports.getRowChildren = getRowChildren;
const getColumns = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.found !== true)
        return [];
    const newData = yield Promise.all(data.children.map((id) => __awaiter(void 0, void 0, void 0, function* () { return yield main_1.getRem(id); })));
    return newData.filter(item => item.found == true && item.remType == "slot");
});
exports.getColumns = getColumns;
const formatData = (columns, rows) => {
    const map = exports.nameMap(columns);
    return rows.map(item => {
        const data = new Map();
        data.set("name", item[0]);
        data.set("_id", item[1]);
        data.set("_tags", item[2]);
        for (const rem of item[3]) {
            if (rem.found) {
                const name = rem.nameAsMarkdown;
                if (map.get(name))
                    data.set(name, rem.contentAsMarkdown);
            }
        }
        return data;
    });
};
exports.formatData = formatData;
//# sourceMappingURL=tableMethods.js.map