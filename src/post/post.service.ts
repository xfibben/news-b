import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  private prisma: PrismaClient;
  
  constructor() {
    this.prisma = new PrismaClient();
  }
  
  async getPosts() {
    try {
      return this.prisma.post.findMany({
        include: {
          author: {
            select: {
              id: true,
              username: true
            }
          },
          files: true,
          _count: {
            select: {
              ratings: true,
              favorites: true
            }
          }
        }
      });
    } catch (e) {
      throw e;
    }
  }
  
  async getPostById(id: number) {
    try {
      return this.prisma.post.findFirst({
        where: { id },
        include: {
          author: {
            select: {
              id: true,
              username: true
            }
          },
          files: true,
          ratings: true,
          favorites: true
        }
      });
    } catch (e) {
      throw e;
    }
  }
  
  async createPost(post: CreatePostDto, authorId: number, fileIds?: number[]) {
    try {
      // Usar transacción para crear el post y relacionar archivos existentes
      return this.prisma.$transaction(async (tx) => {
        // Crear el post
        const newPost = await tx.post.create({
          data: {
            title: post.title,
            content: post.content,
            authorId: authorId
          }
        });
        
        // Si hay fileIds, relacionar los archivos existentes con el post creado
        if (fileIds && fileIds.length > 0) {
          await tx.fileContent.updateMany({
            where: {
              id: {
                in: fileIds
              }
            },
            data: {
              postId: newPost.id
            }
          });
        }
        
        // Retornar el post con sus archivos
        return tx.post.findFirst({
          where: { id: newPost.id },
          include: {
            files: true
          }
        });
      });
    } catch (e) {
      throw e;
    }
  }
  
  async updatePost(id: number, post: UpdatePostDto) {
    try {
      const findPost = await this.prisma.post.findFirst({ where: { id } });
      if (!findPost) {
        throw new HttpException('Post not found', 404);
      }
      
      return this.prisma.post.update({
        where: { id },
        data: post,
        include: {
          files: true
        }
      });
    } catch (e) {
      throw e;
    }
  }
  
  async deletePost(id: number) {
    try {
      const findPost = await this.prisma.post.findFirst({ where: { id } });
      if (!findPost) {
        throw new HttpException('Post not found', 404);
      }
      
      // Eliminar el post (las restricciones de cascada deberían eliminar los archivos relacionados)
      return this.prisma.post.delete({
        where: { id }
      });
    } catch (e) {
      throw e;
    }
  }
  
}