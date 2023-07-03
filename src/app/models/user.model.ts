export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: {},
    avatar: string;
}

export interface CreateUserDTO extends Omit<User, 'id'> { }