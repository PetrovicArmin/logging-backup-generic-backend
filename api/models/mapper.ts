const  map = (object: any, properties: string[]): any => {
    const returnValue: any = {};
    for (let property of properties) 
        returnValue[property] = object[property];
    return returnValue;
};

export default map;