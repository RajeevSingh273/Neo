import { Pipe, PipeTransform } from "@angular/core";
import { SubSideBarItemModel } from "./../model/configuration.model";

@Pipe({
  name: "filterCommodity"
})
export class CommoditydataPipe implements PipeTransform {
  transform(items: any[], filter: any): any {
    console.log(filter);
    if (!items || !filter) {
      return items;
    }
    return items.filter(function(item) {
      return JSON.stringify(item)
        .toLowerCase()
        .includes(filter);
    });
  }
}
