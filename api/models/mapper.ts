const map = (object: any, properties: string[]): any => {
    const returnValue: any = {};
    for (let property of properties) 
        if (object[property])
            returnValue[property] = object[property];
    console.log("My created object: ", returnValue);
    return returnValue;
};

export default map;