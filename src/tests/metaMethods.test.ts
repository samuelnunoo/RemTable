import { createRem, createInvalidRem } from './mocks/Rem';
import { getMainTag, findConfigOption, updateRemTemplate } from '../ts/metaMethods';
import RemNoteAPI from 'remnote-api';
import { invalidRem } from 'remnote-api';


const gr = async (id:string) => {
    const data = {
        "1": createRem({nameAsMarkdown:""}),
        "2": createRem({nameAsMarkdown:"Template:10593"}),
        "3": createRem({nameAsMarkdown:"Carpet:3454"})
    }

  return await data[id]
}

describe("getMetaData",() => {

    const gc = (id:string) => async () => ({remId:id}) as RemNoteAPI.context
    const rbn = async (name:string) => {
    
        const data = {
            "RemTable:1": createRem({_id:"2"}),
            "RemTable:239": createInvalidRem(),
        }

        return data[name]
    }


    test("It should return a valid entry", () => {
        getMainTag(gc("1"),rbn).then(result => {
            expect(result.found == true && result._id == "2" ).toBe(true)
        })
    })

    test("It should return Invalid Rem", () => {
        getMainTag(gc("239"),rbn).then(result => {
            expect(result.found == false).toBe(true)
        })
    })


  




   
})

describe("findConfigOption",() => {
  

    const rem = createRem({children:["1","2","3"]})

    test("can find proper entry" ,() => {
        findConfigOption(gr,rem,"Template").then(result => {
            expect(result?.nameAsMarkdown).toBe("Template:10593")
        })
    })

    test("return undefined", () => {
        findConfigOption(gr,rem,"NotHere").then(result => {
            expect(result).toBe(undefined)
        })
    })
})

describe("updateRemTemplate", () => {
    let value = ''
    const ur = async (id,data) => {
            value = data.name
    }
    const template = "Example"
    const node = createRem({_id:"1"})

    test("it updates value in the proper format ", () => {
        updateRemTemplate(node,ur,template).then(result => {
            expect(value).toBe("Template:Example")
        })
    })

    value = ''
    test("it does not update value", () => {
        updateRemTemplate(createInvalidRem(),ur,template).then(result => {
            expect(value).toBe('')
        })
    })
})


