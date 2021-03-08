export const checkCharObjectStructure = (charObject) => {
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
    checkProperty('hasBeenBidded')
    checkProperty('id')
    checkProperty('level')
    checkProperty('nickname')
    checkProperty('outfitId')
    checkProperty('serverId')
    checkProperty('skills')
    checkProperty('items')
    checkProperty('vocationId')
    checkProperty('charms')
    checkProperty('transfer')
    checkProperty('imbuements')
    checkProperty('hasSoulwar')

    return status;
}