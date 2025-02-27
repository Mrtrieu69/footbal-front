export function isObject(value){
    return typeof value === "object" && value !== null && !Array.isArray(value)
}

export function isEmptyObjectOrList (value) {
    return !value || Object.keys(value).length === 0
}

export function findInObjectOrList (targetId, values) {
    if (isObject(values)){
        return Object.values(values).find(item => item.id === targetId);
    }else{
        return values.find(item => item.id === targetId);
    }
}