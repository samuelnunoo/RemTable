import { invalidRem, RemId, RemType, RichText, validRem} from "remnote-api";




export const createInvalidRem = () => ({found:false}) as invalidRem


interface remData {
    _id?:string;
    parent?:RemId|undefined;
    children?: RemId[];
    name?:RichText;
    nameAsMarkdown?:string;
    content?: RichText | undefined;
    contentAsMarkdown?: string | undefined;
    source?: RichText;
    remType?: RemType;
    isDocument?: boolean;
    visibleRemOnDocument?: RemId[];
    updatedAt?:Date;
    tagChildren?: RemId[];
    tagParents?:RemId[]
}

export const createRem = (data:remData) => ({
    found:true,
    _id: "123456",
    parent: undefined,
    children: ["123","234"],
    name:"Example Rem",
    nameAsMarkdown: "Example Rem",
    content: undefined,
    contentAsMarkdown: undefined,
    source: "",
    remType: "concept",
    isDocument: false,
    visibleRemOnDocument: [],
    updatedAt: "1/25/2020",
    tagChildren: [],
    tagParents: [],
    ...data

} as validRem)
    
