export interface ICategory {
    id: number;
    name: string;
    image: string;
    description: string;
}

export interface IGetCategories {
    content: ICategory[],
    totalElements: number
}

export interface ICategorySearch {
    name: string,
    page: number,
    size: number
}