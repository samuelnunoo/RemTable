import { createRem, createInvalidRem } from './mocks/Rem';
import { getMetaData, getTemplates, extractTemplate } from '../ts/setupMethods';



describe("getMetaData",  () => {
    const gc = async () => await createRem({children: ['1','2','3']})

    const gr = async (id) => {
        const data = {  
                '1': createRem({children: ['1','2','3'], nameAsMarkdown:  "Test1"}),
                '2': createRem({children: ['1','2','3'], nameAsMarkdown: "Test2"}),
                '3': createRem({children: ['1','2','3'], nameAsMarkdown: "Test3"})
                    }

        return await data[id]
    }


    const data2 = new Map()
    .set("Test1",["Test1","Test2","Test3"])
    .set("Test2",["Test1","Test2","Test3"])
    .set("Test3",["Test1","Test2","Test3"])

    test("example",() => {

         getMetaData(gc,gr).then(data => {
            expect(data).toBe(data2)
         
        })

    })



 
})

describe("getTemplates",() => {
    const rbn_f = async () => await createInvalidRem()
    const rbn_t = async () => await createRem({nameAsMarkdown:"RemTable:Template",tagChildren: ['1','2','3']})

    const gr = async (id) => {
        const data = {
            '1': createRem({nameAsMarkdown:"Template1"}),
            '2': createRem({nameAsMarkdown:"Template2"}),
            '3': createRem({nameAsMarkdown:"Template3"})
        }

        return await data[id]
    }

    test("Should return empty list", () => {
        getTemplates(rbn_f,gr).then(result => {
            expect(result).toBe([])
        })
    })
 
    test("Should return data in proper format", () =>{
        getTemplates(rbn_t,gr).then(result => {
            expect(result).toBe(["Template1","Template2","Template3"])
        })
    })

    
})

describe("extractTemplate",() => {

    test("can handle valid case", () => {
        const result = extractTemplate(["test:567","Template:123","Something:345"])
        expect(result).toBe("123")
    })

    test("can handle invalid case" ,() => {
        const result = extractTemplate(["test:567","Templat2e:123","Something:345"])
        expect(result).toBe('')
    })
})