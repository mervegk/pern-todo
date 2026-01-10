import axios from "axios";

export const getTodos = async () => axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/todos`).then(res => res.data);

export const addTodos = async (description: string) => axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/todos`, { description: description }).then(res => res.data);