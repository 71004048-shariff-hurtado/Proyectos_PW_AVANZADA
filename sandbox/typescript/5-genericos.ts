export class Lista<T>{
    item: T[];

    constructor(items: T[]){
        this.item=items;
    }

}

new Lista<string>(["a","b","c"]);

new Lista<number>([1,2,3,4]);

new Lista<boolean>([true, false]);