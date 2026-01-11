"use client"
import React, { useEffect, useState } from 'react'
import { PiXCircle } from "react-icons/pi";
import { deleteTodo } from '../api/todo';

type DeleteTodoProps = {
  close: () => void,
  todo_id: number,
}

export default function DeleteTodo({ close, todo_id }: DeleteTodoProps) {

  const deleteTodos = async () => {
    try {
      await deleteTodo(todo_id);
    } catch (err) {
      console.error("An error occured while deleting todos", err);
    }

    setTimeout(close, 600);
    location.reload();
  }

  return (
    <section className='absolute h-full w-full bg-black/20 dark:bg-black/50 flex items-center justify-center top-0 left-0'>
      <div className='shadow-lg rounded-lg border-2 bg-white dark:border-gray-700 dark:bg-gray-500 md:text-xl p-4'>
        <div className='flex w-full items-center justify-end p-2'>
          <button onClick={close} className='cursor-pointer'><PiXCircle /></button>
        </div>
        <h3 className='text-center'>Are you sure you want to delete this todo?</h3>
        <div className='mt-4 w-full flex items-center justify-center gap-4 text-white'>
          <button onClick={deleteTodos} className='bg-red-500 text-lg py-1 px-4 rounded text-center'>Yes</button>
          <button onClick={close} className='bg-green-500 dark:bg-green-600 text-lg py-1 px-4 rounded text-center'>No</button>
        </div>
      </div>
    </section>
  )
}