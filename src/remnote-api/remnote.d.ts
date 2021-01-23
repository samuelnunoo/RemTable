declare module "remnote-api" {
    export const v0 = new RemNoteAPIv0()

    type ApiKey = string;
    type UserID = string;
    type RemId = string;
    type RichText = string;
    type Date = string

    type RemType = "no_content" | "concept" | "descriptor" 
    | "quetion" | "slot"

    interface options {
        apiKey?:ApiKey;
        name?:string;
        userId?:UserID;
        text?:string;
        parentId?: RemId | Undefined 
        positionAmongstSiblings?:number 
        addToEditLater?:boolean
        isDocument?: boolean;
        source?: string 
    }

    interface validRem {
        found: true;
        _id: string;
        parent: RemId | undefined;
        children: RemId[];
        name: RichText;
        nameAsMarkdown: string;
        content: RichText | undefined;
        contentAsMarkdown: string | undefined;
        source: RichText;
        remType: remType;
        isDocument: boolean;
        visibleRemOnDocument: RemId[];
        updatedAt:Date;
        tagChildren: remId[];
        tagParents: RemId[];
    }

    interface invalidRem {
        found: false;
    }
    
    type Rem = validRem | invalidRem

    interface context {
        remId: RemId;
        documentId: RemId;
        selectedTextAtActivation: string | undefined 
    }

    declare class RemNoteAPIv0 {
 
        makeAPICall(methodName:string, options?:options): Promise<void>
        get(remId:string, options?:options): Promise<Rem>
        get_by_name(name:string,options?:options): Promise<Rem>
        get_by_source(url:string,options?:options):Promise<Rem>
        update(remId:string, options?:options):Promise<void>
        delete(remId:string, options?:options): Promise<void>
        create(text:string,parentId?:string,options?:options): Promise<{remId: RemId}>
        get_context(options?:options): Promise<context>
        close_popup(options?:options): Promise<{success: boolean }>
   
   }
}














