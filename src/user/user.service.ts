import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto,UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }

    async getUsers() {
        try{
            return this.prisma.user.findMany();
        }catch(e){
            throw e;
        }
    }

    async getUserByName(username: string) {
        try{
            return await this.prisma.user.findUnique({
                where: {username}
            })
        }catch(e){
            throw e;
        }
    }

    async createUser(user: CreateUserDto){
        try{
            const verifyUser = await this.prisma.user.findUnique({
                where:{username:user.username}
            })
            if(!verifyUser){
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password,salt);
                return await this.prisma.user.create({
                    data: user
                })
                return user;
            }
        }catch(e){
            throw e;
        }
    }

    async updateUser(username:string,user: UpdateUserDto){
        try{
            const verifyUser = await this.prisma.user.findUnique({
                where:{username:username}
            })
            if(verifyUser){
                return await this.prisma.user.update({
                    where:{username:username},
                    data: user
                })
            }
        }catch(e){
            throw e;
        }
    }

    async deleteUser(username: string){
        try{
            const verifyUser = await this.prisma.user.findUnique({
                where:{username}
            })
            if(verifyUser){
                return await this.prisma.user.delete({
                    where:{username}
                })
            }
        }catch(e){
            throw e;
        }
    }

}
