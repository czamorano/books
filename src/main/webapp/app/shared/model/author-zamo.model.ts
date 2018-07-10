import { Moment } from 'moment';
import { IBookZamo } from 'app/shared/model//book-zamo.model';

export interface IAuthorZamo {
    id?: number;
    name?: string;
    birthDate?: Moment;
    books?: IBookZamo[];
}

export class AuthorZamo implements IAuthorZamo {
    constructor(public id?: number, public name?: string, public birthDate?: Moment, public books?: IBookZamo[]) {}
}
