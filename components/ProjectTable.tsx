"use client"

import React, { useEffect, useState } from 'react'
import { PROJECTS_BY_QUERY } from '@/sanity/lib/queries';
import { TableComponent } from './shared/Table';
import { client } from '@/sanity/lib/client';
import { useRouter } from 'next/navigation';
import { Project } from '@/sanity/types';
import { deleteById } from '@/lib/actions';
import { toast } from '@/hooks/use-toast';
import { PlusCircleIcon } from 'lucide-react';

const ProjectTable = ({ role }: { role?: string }) => {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[] | []>([])

  const getProjects = async () => {
    const params = { search: null }
    const searchForProjects = await client
      .withConfig({ useCdn: false })
      .fetch(PROJECTS_BY_QUERY, params);
    setProjects(searchForProjects);
  }

  const handleDelete = async (post: Project) => {
    console.log('ProjectTable -> handleDelete', post._id)
    if (confirm('Are you sure you want to delete this item?')) {
      const { error, status } = await deleteById(post._id)
      if (status === 'ERROR') {
        console.error('ProjectTable -> handleDelete', error)
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        })
        return;
      }

      toast({ title: "Success", description: "Your item has been deleted successfully" });

      getProjects();
    }
  }

  const handleEdit = async (post: Project) => {
    console.log('TableComponent -> path', post)
    router.push(`/auth/du-an/${post.slug?.current}`)
  }

  const handleAddProject = async () => {
    router.push(`/auth/du-an/create`)
  }

  useEffect(() => {
    getProjects();
  }, [])

  if (!projects) return null;

  return (
    <section className={"section_container !justify-items-center !mt-0 overflow-auto h-full"}>
      <div className='absolute top-0 flex items-center justify-end w-full h-24 gap-10 py-4 right-10 '>
        <p>Dự Án</p>
        <PlusCircleIcon className={"size-12 text-white hover:cursor-pointer"} onClick={handleAddProject} />
      </div>
      <div className='flex justify-end w-full h-full'>
        <TableComponent
          data={projects}
          title='Dự Án'
          path='du-an'
          actions={role == 'admin' || role == 'editor' ? ['Edit', 'Delete'] : []}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </section>
  )
}
export default ProjectTable
