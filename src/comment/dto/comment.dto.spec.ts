import { Comment } from './comment.dto';

describe('Comment', () => {
  it('should be defined', () => {
    expect(new Comment()).toBeDefined();
  });
});
