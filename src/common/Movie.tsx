/**
 * @author Ketul Patel - B00900957
 */
export default interface Movie {
  _id?: string, 
  title: string,
  released_date: Date,
  director: string,
  genres: string[],
  time_in_minutes: string,
  plot: string,
  cast: string[],
  images: string[],
  thumbnail: string,
  poster: string,
  trailor: string
}
