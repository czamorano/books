import { Moment } from 'moment';

export interface IBookZamo {
    id?: number;
    title?: string;
    description?: string;
    publicationDate?: Moment;
    price?: number;
    authorId?: number;
}

export class BookZamo implements IBookZamo {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public publicationDate?: Moment,
        public price?: number,
        public authorId?: number
    ) {}
}
