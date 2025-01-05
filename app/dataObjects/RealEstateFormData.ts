//todo to be all deleted

export interface Details {
  floor?: number | "";
  numberOfFloors?: number | "";
  finalizationType?: FinalizationType | "";
  numberOfRooms?: number | "";
  numberOfBathRooms?: number | "";
  yearOfDelivery?: number;
  onMarketType?: OnMarketType | "";
  rentType?: RentType | ""; // rent
  endowmentType?: EndowmentType | ""; // sell
}

export enum AreaOption {
  METER = "METER",
  LEBNAH = "LEBNAH",
}
export enum FinalizationType {
  SUPERLUX = "SUPERLUX",
  LUX = "LUX",
  HALF = "HALF",
  NONE = "NONE",
}
export enum OnMarketType {
  NEW = "NEW",
  RESELL = "RESELL",
}
export enum RentType {
  COMMERCIAL = "COMMERCIAL",
  PERSONAL = "PERSONAL",
  BOTH = "BOTH",
}
export enum EndowmentType {
  ENDOWED = "ENDOWED",
  FREELAND = "FREELAND",
  MIXED = "MIXED",
}
