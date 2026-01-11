"use client"
import React, { useState, useEffect } from 'react'
import { PiXCircle } from "react-icons/pi";
import { addTodos, updateTodos } from '../api/todo';

type AddTodoProps = {
  close: () => void,
  isEdit?: boolean,
  id?: number
}

export default function AddEditTodo({ close, isEdit, id }: AddTodoProps) {
  console.log(id);


  const addTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const description = formData.get("description");

    if (typeof description !== "string" || !description.trim()) return;


    if (isEdit) {
      await updateTodos(id!, description);
    } else {
      await addTodos(description);
    }

    form.reset();
    setTimeout(close, 600);
    location.reload();
  }

  return (
    <div className='absolute h-full w-full bg-black/50 flex items-center justify-center top-0 left-0'>
      <div className='shadow-lg rounded-lg border-2 border-gray-700 bg-gray-500 md:text-xl'>
        <div className='flex w-full items-center justify-end p-2'>
          <button onClick={close} className='cursor-pointer'><PiXCircle /></button>
        </div>
        <form className='grid grid-cols-1 gap-4 p-4' onSubmit={addTodo}>
          <input name='description' type="text" className='border-2 border-white rounded-lg py-1 px-2 focus:border-blue-700 focus:outline-none text-lg' placeholder='description' />
          <button type='submit' className='justify-self-end py-1 px-3 bg-blue-700 text-center rounded-lg text-base'> {isEdit ? 'Update' : 'Add'} </button>
        </form>
      </div>
    </div>
  )
}