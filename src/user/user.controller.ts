import { Controller, Get, Param, Post, UseGuards, Body, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService){}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  getUsers(){
    return this.userService.getUsers();
  }

  @Get('/:username')
  getUserByName(@Param('username') username:string){
    return this.userService.getUserByName(username);
  }

  @Post('/')
  createUser(@Body() user:CreateUserDto){
    return this.userService.createUser(user);
  }

  @Put('/:username')
  updateUser(@Param('username') username:string, @Body() user:UpdateUserDto){
    return this.userService.updateUser(username,user);
  }

  @Delete('/:username')
  deleteUser(@Param('username') username:string){
    return this.userService.deleteUser(username);
  }

}
