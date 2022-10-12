import { GlobalUtil } from "./global.utils";

describe('GlobalUtil', ()=> {

    type TestDataModel = {
        steps: string[],
        expected: string
    }

    let testingData: TestDataModel[] = [
        {
            "steps" : ["1", "+", "2", "="],
            "expected": "3"
        },
        {
            "steps" : ["1", "+", "2", "+"],
            "expected": "3"
        },
        {
            "steps" : ["1", "+", "-", "2", "="],
            "expected": "-1"
        },
        {
            "steps" : ["1", "0", "+", "0", ".", "3", "="],
            "expected": "10.3"
        },
        {
            "steps" : [".", "2", "+", "3", "="],
            "expected": "3.2"
        },
        {
            "steps": ["1", "+", "2", "=", "4", "+", "1", "="],
            "expected": "35"
        }
    ]

    testingData.forEach((eachTest)=> {
        it(`should result ${eachTest.expected}`, ()=> {
            for (var eachInput of eachTest.steps) {
                GlobalUtil.shared.keyed(eachInput)
            }
            expect(GlobalUtil.shared.resultDisplay).toBe(eachTest.expected)
            GlobalUtil.shared.keyed("AC")
        })
    })

})