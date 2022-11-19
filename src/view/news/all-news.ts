import { News } from 'src/news/dto/news.dto';
export const renderAllNews = (news: News[]): string => {
  let result = '';
  news.forEach((news) => {
    result += `
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${news.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${news.author}</h6>
            <p>${news.viewsCount || 0}</p>
          </div>
        </div>
    `;
  });
  return result;
};
