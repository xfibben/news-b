import {Role} from '@prisma/client';

export interface CreateUserDto {
    username: string;
    email: string;
    password: string;
    role: Role;
}

export interface UpdateUserDto {
    username?: string;
    email?: string;
    password?: string;
    role?: Role;
}