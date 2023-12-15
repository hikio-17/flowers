import { Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';

@Injectable()
export class CloudinaryService {
  private cloudinaryConfig = {
    cloud_name: 'dpainae3u',
    api_key: '246578437816247',
    api_secret: 'bhwBNI625d6FnsuPDiEcHC8AwVg',
  };

  constructor() {
    cloudinary.v2.config(this.cloudinaryConfig);
  }

  async upload(image: string) {
    const result = await cloudinary.v2.uploader.upload(image, {
      public_id: `${Date.now()}`,
      resource_type: 'image',
    });

    return result;
  }

  async delete(pulicId: string) {
    const { result, error } = await cloudinary.v2.uploader.destroy(pulicId);

    return { result, error };
  }
}
