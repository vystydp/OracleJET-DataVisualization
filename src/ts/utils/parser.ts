abstract class Parser {
    public abstract parse(): ScatterStruct;
}

export interface ScatterStruct { columns: string[], series: string[]; groups: string[]; }


export default class Zeppelin extends Parser {
    data: string;

    constructor(data: string = "") {
        super();
        this.data = data;
    }

    public setData(data) {
        this.data = data;
    }

    parse(): ScatterStruct {
        const {columns} = this.splitDataIntoColumns(this.data)
        const series = [];
        const groups = [];

        for (var i = 1; i < columns.length; i++) {  //@TODO think about better solution than O(n2) using dictionary
            let serie = { name: "", items: [] };

            if (columns[i][0]) {
                serie["name"] = columns[i][0];
            }

            for (var j = 1; j < columns[i].length; j++) {
                if (i === 1) {
                    groups.push(columns[0][j]);
                }
                serie.items.push({ x: j, y: columns[i][j] })
            }
            series.push(serie);
        }

        return {columns, groups, series}
    }


    /**
     * 
     * @param data 
     */
    private splitDataIntoColumns(data: string) {
        const rows = data.split(/\\n/), cells = [], columns = [];

        for (let i = 0; i < rows.length; i++) {
            cells[i] = rows[i].split(/\\t/);
            if(rows.length - 1 === i) { // when last cell in last row is not containg separator e.g. ColumnA\\n1\\t2\\t3\\t4\\na\\tb\\tc\\D
                let lastCellIndex = cells[i].length - 1;
                let lastCellSplited = cells[i][lastCellIndex].split('\\');
                    cells[i][lastCellIndex] = lastCellSplited[0]; //@TODO think about better solution
                    if (lastCellSplited[1]) {
                        cells[i][lastCellIndex + 1] = lastCellSplited[1];   
                    }                
            }
        }

        for (var i = 0; i < cells[0].length; i++) {
            columns[i] = cells.map((row, index) => row[i])
        }
        return { cells, columns }
    };



}