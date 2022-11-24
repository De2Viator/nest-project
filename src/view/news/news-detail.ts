import { Comment } from 'src/comment/dto/comment.dto';
import { News } from 'src/news/dto/news.dto';

export const renderDetailedNews = (news: News, comments: Comment[]) => {
  let commentContent = '';
  comments.forEach((comment) => {
    commentContent += `
    <img src=${comment.cover} />
    <div class='d-flex'>
      <p>${comment.author}</p>
      <p>${comment.text}</p>
    </div>
    <form action='http://localhost:3000/comment/nest/${comment.id}' method='POST'>
      <input name='text' type='text'/>
      <input name='image' type='file' />
      <button type='submit'>Reply</button>
    <form>`;
    comment.nestedComments.forEach((nested) => {
      commentContent += `<p>${nested.text}</p>`;
    });
  });
  return `
    <div class="card col-12">
      <div class="card-body">
        <h5 class="card-title">${news.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${news.author}</h6>
        <p class="card-text">${news.description}</p>
        <p>${news.viewsCount || 0}</p>
        ${commentContent}
      </div>
    </div>`;
};
