const moment = require('moment');

export const createObjectFilter = keys => obj => keys.reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {});

export function flattenObject(ob, prefix) {
    const toReturn = {};
    prefix = prefix ? prefix + '_' : '';

    for (let i in ob) {
        if (!ob.hasOwnProperty(i)) continue;

        if (typeof ob[i] === 'object' && ob[i] !== null) {
        // Recursion on deeper objects
        Object.assign(toReturn, flattenObject(ob[i], prefix + i));
        } else {
        toReturn[prefix + i] = ob[i];
        }
    }
    return toReturn;
}

export const formatDT = (obj, key) => {
    obj[key] =  moment(obj[key] * 1000).format('lll');
    return obj
} 

export function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

export const formatSpeed = (obj, key) => {
    obj[key] = roundToTwo(obj[key] * 3.6);
    return obj
} 

export const formatTemp = (obj, key) => {
    obj[key] = roundToTwo(obj[key] - 273.15);
    return obj
} 
  
export const forecastListParser = (list) => {
    const myList = [];
    const myFilter = createObjectFilter([ 'dt', 'main_temp', 'wind_speed' ]);
    let newObject;
    list.forEach(element => {
        element = flattenObject(element);
        newObject = myFilter(element);
        newObject = formatDT(newObject, 'dt');
        newObject = formatTemp(newObject, 'main_temp');
        newObject = formatSpeed(newObject, 'wind_speed');
        myList.push(newObject);
    });
    return myList;
}