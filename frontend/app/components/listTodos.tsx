"use client"
import React, { useState, useEffect } from 'react'
import { PiTrash, PiNotePencil, PiPlusCircle } from "react-icons/pi";
import { Todo } from '../types/todo'
import { getTodos } from '../api/todo';
import AddEditTodo from './AddEditTodo';
import DeleteTodo from './DeleteTodo';


export default function ListTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setDelete] = useState<boolean>(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (err) {
        console.error("An error occured while fetching todos", err);
      }
    }
    fetchTodos();
  }, [])

  return (
    <section className='container mx-auto h-full flex flex-col justify-center'>
      <div className='mb-4 flex self-end'>
        <button onClick={() => setShowAdd(prev => !prev)} className='text-3xl cursor-pointer'><PiPlusCircle /></button>
        {showAdd && <AddEditTodo close={() => setShowAdd(false)} />}
      </div>
      <ul className='w-full grid grid-cols-1 gap-4'>
        {
          todos.map((i, index) => (
            <li key={i.todo_id} className='grid grid-cols-[10%_70%_20%] items-center w-full p-4 border-2 border-white rounded-lg'>
              <div className='mr-2'>{index + 1}</div>
              <div>
                {i.description}
              </div>
              <div className='justify-self-end grid grid-cols-2 items-center gap-1'>
                <button onClick={() => {
                  setShowEdit(prev => !prev);
                  setSelectedTodoId(i.todo_id)
                }} className='cursor-pointer'><PiNotePencil /></button>
                <button onClick={() => {
                  setDelete(prev => !prev);
                  setSelectedTodoId(i.todo_id)
                }} className='cursor-pointer'><PiTrash /></button>
              </div>
            </li>
          ))
        }
      </ul>
      {(selectedTodoId && showDelete) && <DeleteTodo close={() => setDelete(false)} todo_id={selectedTodoId} />}
      {(selectedTodoId && showEdit) && <AddEditTodo close={() => setShowEdit(false)} isEdit id={selectedTodoId} />}
    </section>
  )
}