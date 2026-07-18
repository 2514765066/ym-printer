import { createReadStream } from 'fs';
import { createHash } from 'crypto';

export const getMd5 = async (path: string) => {
  try {
    const hash = createHash('md5');

    for await (const chunk of createReadStream(path)) {
      hash.update(chunk);
    }

    return hash.digest('hex');
  } catch {
    return '';
  }
};
