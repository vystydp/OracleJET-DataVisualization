import * as ko from "knockout";
import Zeppelin, { ScatterStruct } from "../utils/parser";


const DEFAULT_INPUT = "Sex\\tCzech\\tGermany\\tAustria\\nMale\\t1600\\t1033\\t1850\\nFemale\\t4565\\t4567\\t7896";

class ScatterViewModel {
    parser: Zeppelin;
    scatterData: ScatterStruct;
    scatterSeries: ko.ObservableArray<string>;
    scatterGroups: ko.ObservableArray<string>;
    input: string;

    constructor() {
        this.input = DEFAULT_INPUT;
        this.parser = new Zeppelin(this.input);
        this.scatterData = this.parser.parse();
        this.scatterSeries = ko.observableArray(this.scatterData.series);
        this.scatterGroups = ko.observableArray(this.scatterData.groups);
        this.scatterInputChanged = this.scatterInputChanged.bind(this);
    }


    public scatterInputChanged() {
        this.parser.setData(this.input);
        this.scatterData = this.parser.parse();
        this.scatterSeries(this.scatterData.series);
        this.scatterGroups(this.scatterData.groups);
    }
}

export default new ScatterViewModel();