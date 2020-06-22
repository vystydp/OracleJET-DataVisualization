import * as ko from "knockout";
import * as ResponsiveUtils from "ojs/ojresponsiveutils";
import * as ResponsiveKnockoutUtils from "ojs/ojresponsiveknockoututils";

class RootViewModel {
  smScreen: ko.Observable<boolean>;
  appName: ko.Observable<string>;
  title: ko.Observable<string>;

  constructor() {
    // media queries for repsonsive layouts
    let smQuery: string | null = ResponsiveUtils.getFrameworkQuery("sm-only");
    if (smQuery) {
      this.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
    }

    // application Name used in Branding Area
    this.appName = ko.observable("Web-based notebook");

    this.title = ko.observable("Data visualization based on Zeppelin syntax");
  }
}

export default new RootViewModel();