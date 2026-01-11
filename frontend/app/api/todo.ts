import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL + "/todos";

export const getTodos = async () => axios.get(baseURL).then(res => res.data);

export const addTodos = async (description: string) => axios.post(baseURL, { description: description }).then(res => res.data);

export const updateTodos = async (todo_id: number, description: string) => axios.put(`${baseURL}/${todo_id}`, { description: description }).then(res => res.data);

export const deleteTodo = async (id: number) => axios.delete(`${baseURL}/${id}`);