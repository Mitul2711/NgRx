export class StoreUtility {

    static normalize(entityArray: Entity[]) {
        return entityArray.reduce((previousValue, currentValue) => {
            return {...previousValue, ...{[currentValue.id]: currentValue}};
        }, {})
    }

    static unNormalized(entities: any) {
        if(!entities) {
            return [];
        } else {
            return Object.keys(entities).map(key => entities[key]);
        }
    }

    static removeDuplicateIds(ids: any) {
        return ids.filter((ele: any, value: any, self:  any[]) => {value === self.indexOf(ele) })
    }

    static removeKey(entities: any, id: any) {
        const newObj = {...entities};
        delete newObj[id];
        return newObj
    }

}

interface Entity {
    id: any
}