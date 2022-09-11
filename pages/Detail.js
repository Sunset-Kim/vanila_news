import hackerAPI from "../services/hackerAPI";

export default async function Detail(id) {
  const newsItem = await hackerAPI.getNewsItem(id);

  return `
  <h1>${newsItem.title}</h1>
  <a href="#">목록으로</a>
  `;
}
