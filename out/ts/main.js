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
exports.remByName = exports.createRem = exports.getRem = void 0;
//Common Helper Methods
const remnote_api_1 = __importDefault(require("remnote-api"));
const getRem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const context = yield remnote_api_1.default.v0.get(id);
    return context;
});
exports.getRem = getRem;
const createRem = (name, parent) => __awaiter(void 0, void 0, void 0, function* () {
    return yield remnote_api_1.default.v0.create(name, parent);
});
exports.createRem = createRem;
const remByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield remnote_api_1.default.v0.get_by_name(name);
});
exports.remByName = remByName;
//# sourceMappingURL=main.js.map