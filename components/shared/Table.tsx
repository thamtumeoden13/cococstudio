"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils";
import { EditIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

export const TableComponent = ({ data, title, className, path, onDelete, onEdit, actions = [] }:
  {
    data: any[];
    title: string;
    className?: string;
    path?: string;
    actions?: string[];
    onDelete?: (post: any) => void;
    onEdit?: (post: any) => void;
  }
) => {

  const handleActionRow = (post: any, action: string) => {
    if (action === 'Edit') {
      if (onEdit) onEdit(post)
    } else if (action === 'Delete') {
      if (onDelete) onDelete(post)
    }
  }

  return (
    <Table className={cn('w-full', className)}>
      {/* <TableCaption>{title}</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="text-20-medium !text-white">Title</TableHead>
          <TableHead className="text-20-medium !text-white">Permalink</TableHead>
          <TableHead className="text-20-medium !text-white">Thumbnail</TableHead>
          <TableHead className="text-20-medium !text-white">Description</TableHead>
          {!!actions.length && <TableHead className="text-20-medium !text-white">Action</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={`${item._id}-${index}`} className="hover:bg-slate-800">
            <TableCell width={200} className="font-medium">{item.title}</TableCell>
            <TableCell width={200}>{item.slug?.current}</TableCell>
            <TableCell width={200} height={100}>
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={100}
                height={100}
                className="object-cover w-full rounded-sm"
              />

            </TableCell>
            <TableCell className="font-normal">{item.description}</TableCell>
            {[...actions]?.map((act) => (
              <TableCell key={act} className="w-[40px] items-center justify-center ">
                {act === 'Edit' && <EditIcon className={"size-6 text-white hover:cursor-pointer"} onClick={() => handleActionRow(item, act)} />}
                {act === 'Delete' && <TrashIcon className={"size-6 text-red-500 hover:cursor-pointer"} onClick={() => handleActionRow(item, act)} />}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}