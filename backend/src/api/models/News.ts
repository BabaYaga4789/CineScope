import mongoose from "mongoose";

const Schema = mongoose.Schema;

const news = new Schema({
  newsTitle: String,
  posterLink: String,
  fullArticle: String,
  date: Date,
  year: String,
  movieName: String,
  genre: [String]
});

const News = mongoose.model("News", news);

export function getNews(newsID: String) {
  if (newsID === undefined) {
    throw "Oi! You forgot to pass NewsID!";
  }
  const news = News.find({ newsID: newsID });
  return news;
}

export async function createNews(
  newsTitle: String,
  posterLink: String,
  fullArticle: String,
  date: Date,
  year: String,
  movieName: String,
  genre: [String]
) {
  if (
    newsTitle === undefined ||
    posterLink === undefined ||
    fullArticle === undefined ||
    genre === undefined ||
    date === undefined ||
    year === "" ||
    movieName === ""
  ) {
    throw "Missing parameters";
  }

  const news = await getNews(newsTitle);
  console.log(typeof news);
  if (news.length > 0) {
    throw "News already exists";
  }

  const newNews = new News({
    newsTitle: newsTitle,
    posterLink: posterLink,
    fullArticle: fullArticle,
    date: date,
    year: year,
    movieName: movieName,
    genre: genre
  });
  try {
    newNews.save();
  } catch (err) {
    throw err;
  }
}

export function updateNews(newsID: String) {
  if (newsID === undefined) {
    throw "Oi! You forgot to pass an NewsID!";
  }

  const usr = News.find({ email: newsID }).updateOne(news);
  return usr;
}

export async function deleteNews(newsID: String) {
  if (newsID === undefined) {
    throw "Oi! You forgot to pass the NewsID!";
  }

  const response = await News.deleteOne({ email: newsID });

  console.log(response);
  if (response.deletedCount === 0) {
    throw "News not found";
  }
}

export default mongoose.model("News", news);
