"use client"
import React, { useState, useEffect } from 'react'
import { Todo } from '../types/todo'
import { getTodos } from '../api/todo';


export default function ListTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos()
        setTodos(data)
      } catch (err) {
        console.error("An error occured while fetching todos", err)
      }
    }
    fetchTodos();
  }, [])
  console.log(todos);


  return (
    <section className='container mx-auto h-full flex items-center justify-center'>

      <ul className='w-full grid grid-cols-1 gap-4'>
        {
          todos.map((i, index) => (
            <li key={i.todo_id} className='grid grid-cols-[70%_30%] items-center w-full p-4 border-2 border-white rounded-lg'>
              <div>
                {i.description}
              </div>
              <div className='justify-self-end'>Operations</div>
            </li>
          ))
        }
      </ul>
    </section>
  )
}