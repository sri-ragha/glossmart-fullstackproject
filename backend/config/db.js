import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://sivakumarponnusamy09:fzXTzplbkppFuYu9@cluster0.ofzsz.mongodb.net/gloss_mart').then(()=>console.log("DB Connected"));
}