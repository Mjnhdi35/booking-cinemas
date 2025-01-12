import mongoose from 'mongoose'

export enum Genre {
  HanhDong = 'Hành Động',
  TamLy = 'Tâm Lý',
  TamLyHinhSu = 'Tâm Lý Hình Sự',
  HoatHinh = 'Hoạt Hình',
  KinhDi = 'Kinh Dị',
  KieuNhat = 'Kiểu Nhật',
  BiKich = 'Bi Kịch',
  Comedi = 'Hài Hước',
  TinhCam = 'Tình Cảm',
  PhiVu = 'Phi Vụ',
  LyKy = 'Lý Kỳ',
  ChienTranh = 'Chiến Tranh',
  SuKienLichSu = 'Sự Kiện Lịch Sử',
  DuongPho = 'Đường Phố',
  GiaDinh = 'Gia Đình',
  CuocSong = 'Cuộc Sống',
}

export interface IMovie extends Document {
  title: string
  director: string
  genre: Genre
  duration: number
  releaseDate: Date
  posterUrl?: string
}

const movieSchema = new mongoose.Schema<IMovie>(
  {
    title: { type: String, required: [true, 'Movie is required'] },
    director: { type: String, required: [true, 'Director is required'] },
    genre: {
      type: String,
      enum: Object.values(Genre),
      required: false,
    },
    releaseDate: {
      type: Date,
      required: false,
      default: Date.now(),
    },
    posterUrl: { type: String, required: false },
  },
  { timestamps: true },
)

const Movie = mongoose.model<IMovie>('Movie', movieSchema)

export { Movie }
