"use strict";
/**
 * The RemNote Frontend API allows you to build RemNote plugins.
 * Read more here for a guide, API interface, and examples:
 * https://www.remnote.io/api
 *
 * Version 0.01
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * General interface:
 * RemNoteAPI.v0.makeAPICall(methodName, options);
 *
 * Helper methods (see full signatures on https://www.remnote.io/api):
 * RemNoteAPI.v0.get(remId, options);
 * RemNoteAPI.v0.get_by_name(name, options);
 * RemNoteAPI.v0.get_by_source(url, options);
 * RemNoteAPI.v0.update(remId, options);
 * RemNoteAPI.v0.delete(remId, options);
 * RemNoteAPI.v0.create(text, parentId, options);
 * RemNoteAPI.v0.get_context(options);
 */
class RemNoteAPIV0 {
    constructor() {
        this.usedMessageIds = 0;
        window.addEventListener("message", this.receiveMessage.bind(this), false);
        this.messagePromises = {};
    }
    get(remId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeAPICall("get", Object.assign({ remId }, options));
        });
    }
    get_by_name(name, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeAPICall("get_by_name", Object.assign({ name }, options));
        });
    }
    get_by_source(url, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeAPICall("get_by_source", Object.assign({ url }, options));
        });
    }
    update(remId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeAPICall("update", Object.assign({ remId }, options));
        });
    }
    delete(remId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeAPICall("delete", Object.assign({ remId }, options));
        });
    }
    create(text, parentId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeAPICall("create", Object.assign({ text,
                parentId }, options));
        });
    }
    get_context(options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeAPICall("get_context", options);
        });
    }
    close_popup(options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeAPICall("close_popup", options);
        });
    }
    makeAPICall(methodName, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageId = this.usedMessageIds;
            this.usedMessageIds += 1;
            const message = {
                isIntendedForRemNoteAPI: true,
                methodName,
                options,
                messageId,
                remNoteAPIData: {
                    version: 0
                }
            };
            const messagePromise = new Promise((resolve, reject) => {
                this.messagePromises[messageId] = resolve;
                window.parent.postMessage(message, "*");
            });
            const response = yield messagePromise;
            if (response.error) {
                throw response.error;
            }
            else {
                return response;
            }
        });
    }
    receiveMessage(event) {
        const data = event.data;
        const messageId = data.messageId;
        this.messagePromises[messageId](data.response);
        delete this.messagePromises[messageId];
    }
}
exports.default = {
    v0: new RemNoteAPIV0()
};
//# sourceMappingURL=remnote-api.js.map