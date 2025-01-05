import mongoose from 'mongoose'

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: process.env.DB_NAME!,
    })
    console.log('ket noi thanh cong mongodb')
  } catch (error) {
    console.log('loi ket noi mongodb', error)
    process.exit(1)
  }
}
