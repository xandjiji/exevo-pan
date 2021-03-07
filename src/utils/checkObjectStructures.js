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
    checkProperty('charms')
    checkProperty('currentBid')
    checkProperty('hasBeenBidded')
    checkProperty('hasSoulwar')
    checkProperty('id')
    checkProperty('imbuements')
    checkProperty('level')
    checkProperty('nickname')
    checkProperty('outfitId')
    checkProperty('serverId')
    checkProperty('skills')
    checkProperty('transfer')
    checkProperty('vocationId')

    return status;
}