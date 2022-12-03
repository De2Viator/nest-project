import { Request } from 'express';
import { extname } from 'path';
export const editFileName = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, name: string) => void,
) => {
  const fileExtName = extname(file.originalname);
  const testExt = /(jpe?g)|(gif)|(png)/;
  if (!testExt.test(fileExtName)) {
    throw new Error('file is not valid');
  }
  const randomName = Array(16)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${randomName}${fileExtName}`);
};
