"use client"

import React, { useEffect, useState } from 'react'
import { CONSTRUCTIONS_BY_QUERY } from '@/sanity/lib/queries';
import { TableComponent } from './shared/Table';
import { clientNoCache } from '@/sanity/lib/client';
import { Construction } from '@/sanity/types';
import { useRouter } from 'next/navigation';
import { deleteById } from '@/lib/actions';
import { toast } from '@/hooks/use-toast';
import { PlusCircleIcon } from 'lucide-react';

const ConstructionTable = ({ title, role }: { title: string, role?: string }) => {
  const router = useRouter();

  const [constructions, setConstructions] = useState<Construction[] | []>([])

  const getConstructions = async () => {
    const params = { search: null }
    const searchForProjects = await clientNoCache.fetch(CONSTRUCTIONS_BY_QUERY, params);
    setConstructions(searchForProjects);
  }

  const handleDelete = async (post: Construction) => {
    console.log('ConstructionTable -> handleDelete', post._id)
    if (confirm('Are you sure you want to delete this item?')) {
      const { error, status } = await deleteById(post._id)
      if (status === 'ERROR') {
        console.error('ConstructionTable -> handleDelete', error)
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        })
        return;
      }

      toast({ title: "Success", description: "Your item has been deleted successfully" });

      getConstructions();
    }
  }

  const handleEdit = async (post: Construction) => {
    console.log('TableComponent -> path', post)
    router.push(`/auth/san-pham/${post.slug?.current}`)
  }

  const handleAddConstruction = async () => {
    router.push(`/auth/san-pham/create`)
  }

  useEffect(() => {
    getConstructions();
  }, [])

  if (!constructions) return <div>Loading...</div>;

  console.log('ConstructionTable -> role', role)
  return (
    <section className={"section_container !justify-items-center !mt-0 overflow-auto h-full"}>
      <div className='absolute top-0 flex items-center justify-end w-full h-24 gap-10 py-4 right-10 '>
        <p>{title}</p>
        {(role == 'admin' || role == 'editor') && <PlusCircleIcon className={"size-12 text-white hover:cursor-pointer"} onClick={handleAddConstruction} />}
      </div>
      <div className='flex justify-end w-full h-full'  >
        <TableComponent
          data={constructions}
          title={title}
          path='san-pham'
          actions={role == 'admin' || role == 'editor' ? ['Edit', 'Delete'] : []}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </section>
  )
}
export default ConstructionTable