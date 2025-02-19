export interface UserType {

    full_name:string,
    email:string,
    password:string,
    role:string

}


export interface LoginType {
    email:string,
    password:string
}

export interface createCategoryType {
    category:string,
    description:string,
    parent_category:string
}

export interface updateCategoryType {
    mainCategory:string,
    subCategory:string
}

