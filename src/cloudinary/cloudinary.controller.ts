/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Post } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private cloudinaryService: CloudinaryService) {}

  @Post('/upload')
  async upload(@Body() body: { image: string }) {
    const { public_id, secure_url } = await this.cloudinaryService.upload(
      body.image,
    );

    return {
      public_id,
      url: secure_url,
    };
  }

  @Delete('/remove')
  async delete(@Body() body: { public_id: string }) {
    const { result, error } = await this.cloudinaryService.delete(
      body.public_id,
    );

    if (!result) {
      return { status: 'false', error };
    }

    return { status: 'success', message: 'ok' };
  }
}
