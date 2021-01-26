"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const vuetify_1 = __importDefault(require("vuetify"));
require("vuetify/dist/vuetify.min.css");
vue_1.default.use(vuetify_1.default);
const opts = {};
exports.default = new vuetify_1.default(opts);
//# sourceMappingURL=vuetify.js.map