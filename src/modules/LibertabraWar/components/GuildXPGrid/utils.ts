export const xpToDataSnapshot = (xpArray: XPSnapshot[]): DataSnapshot[] =>
  xpArray.map((dataItem) => ({
    value: dataItem.xp,
    timeStamp: dataItem.timeStamp,
  }))
