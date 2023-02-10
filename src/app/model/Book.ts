export class Book {


    constructor( public title:string ,public autor:string,
        public rok:Date ,public image:string, public opis:string, public categories:string[],public id?:string ) {}

}