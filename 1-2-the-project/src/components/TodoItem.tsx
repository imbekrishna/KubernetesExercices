import type { ReactNode } from "react";

export function TodoItem({ text }: { text: ReactNode }) {
    return <div className='w-full border-l-4 border-green-800 rounded-lg p-2 bg-gray-200 shadow-md'>{text}</div>

}