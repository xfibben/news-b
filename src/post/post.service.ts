import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';

@Injectable()
export class PostService {
    private prisma:PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    getPosts(){
        try{
            return this.prisma.post.findMany();
        }catch(e){
            throw e;
        }
    }

    getPostbyId(id){
        try{
            return this.prisma.post.findFirst({where:{id}});
        }catch(e){
            throw e;
        }
    }

    createPost(post:CreatePostDto){
        try{
            const newPost = this.prisma.post.create({data:post})
        }catch(e){
            throw e;
        }
    }

    updatePost(id:number,post:UpdatePostDto){
        try{
            const findPost = this.prisma.post.findFirst({where:{id}});
            if(!findPost){
                throw new HttpException('Post not found',404);
            }
            return this.prisma.post.update({where:{id},data:post})
        }catch(e){
            throw new e;
        }
    }

    deletePost(id:number){
        try{
            const findPost = this.prisma.post.findFirst({where:{id}});
            if(!findPost){
                throw new HttpException('Post not found',404);
            }
            return this.prisma.post.delete({where:{id}});
        }catch(e){
            throw e;
        }
    }
}
