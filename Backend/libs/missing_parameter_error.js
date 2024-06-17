export class MissinParameterError extends Error{
    constructor(paranName){
        super(`Falta el parametro: ${paramName}`);

        this.paranName =paranName;
    }
}