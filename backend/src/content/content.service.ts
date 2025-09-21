import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './article.schema';
import { Video, VideoDocument } from './video.schema';
import { UserDocument } from '../schemas/user.schema';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
  ) {}

  // Articles
  async createArticle(createArticleDto: any, user: UserDocument) {
    return this.articleModel.create({
      ...createArticleDto,
      createdBy: user._id,
    });
  }

  async findAllArticles() {
    return this.articleModel.find();
  }

  async findOneArticle(id: string) {
    return this.articleModel.findById(id);
  }

  async updateArticle(id: string, updateDto: any) {
    return this.articleModel.findByIdAndUpdate(id, updateDto, { new: true });
  }

  async removeArticle(id: string) {
    return this.articleModel.findByIdAndDelete(id);
  }

  // Videos
  async createVideo(createVideoDto: any, user: UserDocument) {
    // TODO: Fetch metadata with ytdl-core
    return this.videoModel.create({
      ...createVideoDto,
      createdBy: user._id,
    });
  }

  async findAllVideos() {
    return this.videoModel.find();
  }

  async findOneVideo(id: string) {
    return this.videoModel.findById(id);
  }

  async updateVideo(id: string, updateDto: any) {
    return this.videoModel.findByIdAndUpdate(id, updateDto, { new: true });
  }

  async removeVideo(id: string) {
    return this.videoModel.findByIdAndDelete(id);
  }
}