import { request } from "../Config/Request"

export const BookService={
    getAllBook: async()=>{
        const res = await request.get("/book");
        return res.data;
    }
}