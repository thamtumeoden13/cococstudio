"use client"

import React, { useEffect, useState } from 'react'
import { PROJECT_DETAILS_BY_QUERY } from '@/sanity/lib/queries';
import { TableComponent } from './shared/Table';
import { client } from '@/sanity/lib/client';
import { useRouter } from 'next/navigation';
import { ProjectDetail } from '@/sanity/types';
import { toast } from '@/hooks/use-toast';
import { deleteById } from '@/lib/actions';
import { PlusCircleIcon } from 'lucide-react';

const ProjectDetailTable = ({ role }: { role?: string }) => {
  const router = useRouter();

  const [projects, setProjects] = useState<ProjectDetail[] | []>([])

  const getProjectDetails = async () => {
    const params = { search: null }
    const searchForProjects = await client
      .withConfig({ useCdn: false })
      .fetch(PROJECT_DETAILS_BY_QUERY, params);
    setProjects(searchForProjects);
  }

  const handleDelete = async (post: ProjectDetail) => {
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

      getProjectDetails();
    }
  }

  const handleEdit = async (post: ProjectDetail) => {
    console.log('TableComponent -> path', post)
    router.push(`/auth/chi-tiet-du-an/${post.slug?.current}`)
  }

  const handleAddProjectDetail = async () => {
    router.push(`/auth/chi-tiet-du-an/create`)
  }

  useEffect(() => {
    getProjectDetails();
  }, [])

  return (
    <section className={"section_container !justify-items-center !mt-0 overflow-auto h-full"}>
      <div className='absolute top-0 flex items-center justify-end w-full h-24 gap-10 py-4 right-10 '>
        <p>Bài Viết</p>
        <PlusCircleIcon className={"size-12 text-white hover:cursor-pointer"} onClick={handleAddProjectDetail} />
      </div>
      <div className='flex justify-end w-full h-full'>
        <TableComponent
          data={projects}
          title='Bài Viết'
          path='chi-tiet-du-an'
          actions={role == 'admin' || role == 'editor' ? ['Edit', 'Delete'] : []}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </section>
  )
}
export default ProjectDetailTable
