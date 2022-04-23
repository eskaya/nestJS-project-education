import { Controller, Get, Delete, Post, Param, Body, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard }                                                                        from "../../guards/auth.guard";
import { ResponseInterceptor }                                                              from "../../interceptors/response.interceptor";
import { ListService }                                                                      from "../../services/list/list.service";

@Controller("list")
@UseInterceptors(new ResponseInterceptor())
export class ListController {
  
  constructor(private readonly listService: ListService) {}
  
  // GET --> /list
  @Get("")
  @UseGuards(AuthGuard)
  async getAllListItems(@Req() req) {
    return this.listService.getAllItems();
  }
  
  //POST --> /list
  @Post("")
  async createListItem(@Body() createList, @Req() request) {
    return this.listService.createItem(createList, request.userId
    );
  }
  
  //DELETE --> /list/:_id
  @Delete("/:_id")
  async deleteListItem(@Req() req, @Param("_id") id: string) {
    await this.listService.deleteItem(id);
    return {
      deletedAt: new Date().toISOString()
    };
  }
  
}
