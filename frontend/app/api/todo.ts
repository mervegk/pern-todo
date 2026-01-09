import axios from "axios";

export const getTodos = async () => axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/todos`).then(res => res.data)