"use client"
import React, { useState, useEffect } from 'react'
import { PiXCircle } from "react-icons/pi";
import { addTodos } from '../api/todo';

type AddTodoProps = {
  close: () => void
}

export default function AddTodo({ close }: AddTodoProps) {

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const description = formData.get("description");

    if (typeof description !== "string" || !description.trim()) return;

    addTodos(description)

    setTimeout(close, 1500);
    e.currentTarget.reset();

  };

  return (
    <div className='absolute h-full w-full bg-black/50 flex items-center justify-center top-0 left-0'>
      <div className='shadow-lg rounded-lg border-2 border-gray-700 bg-gray-500 md:text-xl'>
        <div className='flex w-full items-center justify-end p-2'>
          <button onClick={close} className='cursor-pointer'><PiXCircle /></button>
        </div>
        <form className='grid grid-cols-1 gap-4 p-4' onSubmit={addTodo}>
          <input name='description' type="text" className='border border-white rounded-lg py-2 px-4' placeholder='description' />
          <button type='submit' className='justify-self-end'>Add</button>
        </form>
      </div>
    </div>
  )
}