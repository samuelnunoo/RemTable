"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Small = exports.Large = exports.Secondary = exports.Primary = void 0;
const Button_vue_1 = __importDefault(require("./Button.vue"));
exports.default = {
    title: 'Example/Button',
    component: Button_vue_1.default,
    argTypes: {
        backgroundColor: { control: 'color' },
        size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
    },
};
const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { MyButton: Button_vue_1.default },
    template: '<my-button @onClick="onClick" v-bind="$props" />',
});
exports.Primary = Template.bind({});
exports.Primary.args = {
    primary: true,
    label: 'Button',
};
exports.Secondary = Template.bind({});
exports.Secondary.args = {
    label: 'Button',
};
exports.Large = Template.bind({});
exports.Large.args = {
    size: 'large',
    label: 'Button',
};
exports.Small = Template.bind({});
exports.Small.args = {
    size: 'small',
    label: 'Button',
};
//# sourceMappingURL=Button.stories.js.map