export const onlineToDataSnapshot = (
  onlineArray: OnlineSnapshot[],
): DataSnapshot[] =>
  onlineArray.map((dataItem) => ({
    value: dataItem.count,
    timeStamp: dataItem.timeStamp,
  }))
