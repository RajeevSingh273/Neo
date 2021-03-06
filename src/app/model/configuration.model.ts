export class ConfigurationModel {
  configId?: string;
  userId: string;
  categoryId: string;
  categoryName: string;
  commodityId: number;
  commodityName: string;
  thresholdId: number;
  thresholdName: string;
  thresholdRange: string;
  source: string;
  email?: string;
  selected: false;
}

export class CategoryModel {
  categoryId: string;
  categoryName: string;
}

export class CommodityModel {
  categoryId: string;
  commodityId: number;
  commodityName: string;
  source: string;
}

export class ThresholdModel {
  thresholdId: number;
  commodityId: number;
  thresholdName: string;
  thresholdValue: string;
}

export class UniqueThresholds {
  thresholdId: number;
  thresholdName: string;
}

export class SideBarItemModel {
  link: string;
  label: string;
  icon: string;
  filterName: string;
  subItem: SubSideBarItemModel[];
}

export class SubSideBarItemModel {
  link: string;
  label: string;
  icon: string;
}
