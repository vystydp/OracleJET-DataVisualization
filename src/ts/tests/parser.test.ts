import Zeppelin from "../utils/parser";
import * as _ from "lodash";

let mocks: Array<string> = [
    "ColumnA\\tColumnB\\tColumnC\\tColumnD\\n1\\t2\\t3\\t4\\na\\tb\\tc\\d",
    "ColumnA\\tColumnB\\tColumnC\\tColumnD\\n1\\t2\\t3\\t4\\na\\tb\\tc\\td",
    "Sex\\tCzech\\tGermany\\tAustria\\nMale\\t1600\\t1033\\t1850\\nFemale\\t4565\\t4567\\t7896"
]


let expectedOutputs = [
    {
        columns: [
            ["ColumnA", "1", "a"],
            ["ColumnB", "2", "b"],
            ["ColumnC", "3", "c"],
            ["ColumnD", "4", "d"]
        ],
        groups: ["1", "a"],
        series: [
            {name: "ColumnB", items: [{x: 1, y: "2"},{x: 2, y: "b"}]},
            {name: "ColumnC", items: [{x: 1, y: "3"},{x: 2, y: "c"}]},
            {name: "ColumnD", items: [{x: 1, y: "4"},{x: 2, y: "d"}]}
        ]
    },
    {
        columns: [
            ["ColumnA", "1", "a"],
            ["ColumnB", "2", "b"],
            ["ColumnC", "3", "c"],
            ["ColumnD", "4", "d"]
        ],
        groups: ["1", "a"],
        series: [
            {name: "ColumnB", items: [{x: 1, y: "2"},{x: 2, y: "b"}]},
            {name: "ColumnC", items: [{x: 1, y: "3"},{x: 2, y: "c"}]},
            {name: "ColumnD", items: [{x: 1, y: "4"},{x: 2, y: "d"}]}
        ]
    },
    {
        series: [ 
            {name: "Czech", items: [{x: 1, y: "1600"}, {x: 2, y: "4565"}]},
            {name: "Germany", items: [{x: 1, y: "1033"},{x: 2, y: "4567"}]}, 
            {name: "Austria", items: [{x: 1, y: "1850"},{x: 2, y: "7896"}]},
        ],
        groups: ["Male", "Female"],
        columns: [ 
            ["Sex", "Male", "Female"],
            ["Czech", "1600", "4565"],
            ["Germany", "1033", "4567"],
            ["Austria", "1850", "7896"] 
        ],
        
    }
]

test('Test zeppelin parser using mock data', () => {
    _.forEach(mocks, (input: string, index: number) => {
        expect(new Zeppelin(input).parse()).toEqual(expectedOutputs[index])
    })
});