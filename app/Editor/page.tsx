import React from 'react'

import { SqlPreview } from '@/components/SqlPreview';
import { SchemaEditor } from '@/components/SchemaEditor';

const page = () => {
  return (
    <div className="flex flex-1 overflow-hidden">
    <div className="h-full flex-1">
      <SchemaEditor />
    </div>

    <div className="w-84 h-full overflow-auto border-l bg-white shadow-md dark:bg-zinc-800">
      <SqlPreview />
    </div>
  </div>

  )
}

export default page
