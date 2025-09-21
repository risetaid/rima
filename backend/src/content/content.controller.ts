import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { ContentService } from './content.service';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role.guard';

@Controller('content')
@UseGuards(AuthGuard)
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  // Articles
  @Post('articles')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['Admin', 'Developer'])
  createArticle(@Body() createArticleDto: any, @Req() req) {
    return this.contentService.createArticle(createArticleDto, req.user);
  }

  @Get('articles')
  findAllArticles() {
    return this.contentService.findAllArticles();
  }

  @Get('articles/:id')
  findOneArticle(@Param('id') id: string) {
    return this.contentService.findOneArticle(id);
  }

  @Patch('articles/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['Admin', 'Developer'])
  updateArticle(@Param('id') id: string, @Body() updateDto: any) {
    return this.contentService.updateArticle(id, updateDto);
  }

  @Delete('articles/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['Admin', 'Developer'])
  removeArticle(@Param('id') id: string) {
    return this.contentService.removeArticle(id);
  }

  // Videos
  @Post('videos')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['Admin', 'Developer'])
  createVideo(@Body() createVideoDto: any, @Req() req) {
    return this.contentService.createVideo(createVideoDto, req.user);
  }

  @Get('videos')
  findAllVideos() {
    return this.contentService.findAllVideos();
  }

  @Get('videos/:id')
  findOneVideo(@Param('id') id: string) {
    return this.contentService.findOneVideo(id);
  }

  @Patch('videos/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['Admin', 'Developer'])
  updateVideo(@Param('id') id: string, @Body() updateDto: any) {
    return this.contentService.updateVideo(id, updateDto);
  }

  @Delete('videos/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['Admin', 'Developer'])
  removeVideo(@Param('id') id: string) {
    return this.contentService.removeVideo(id);
  }
}