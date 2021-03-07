export const checkCharObjectStructure = (charObject) => {
    console.log(charObject);
    if(!charObject) return false;

    let status = true;
    const checkProperty = (property) => {
        if (!charObject.hasOwnProperty(property)) {
            console.log(`Deprecated local data [missing: '${property}']`);
            status = false;
        }
    }

    checkProperty('auctionEnd')
    checkProperty('currentBid')
    checkProperty('id')
    checkProperty('level')
    checkProperty('nickname')
    checkProperty('outfitId')
    checkProperty('serverId')
    checkProperty('skills')
    checkProperty('vocationId')

    return status;
}