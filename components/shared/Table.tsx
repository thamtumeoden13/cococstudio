"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EditIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const TableComponent = ({ data, title, className, path }:
  {
    data: any[];
    title: string;
    className?: string;
    path?: string;
  }
) => {
  const router = useRouter();

  const handleActionRow = (post: any) => {
    if (path) {
      console.log('TableComponent -> path', path)
      router.push(`/auth/${path}/${post.slug.current}`)
    }
  }

  return (
    <Table className="">
      {/* <TableCaption>{title}</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="text-20-medium !text-white">Title</TableHead>
          <TableHead className="text-20-medium !text-white">Permalink</TableHead>
          <TableHead className="text-20-medium !text-white">Thumbnail</TableHead>
          <TableHead className="text-20-medium !text-white">Description</TableHead>
          {path && <TableHead className="text-20-medium !text-white">Action</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item._id}>
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
            {path &&
              <TableCell className="flex items-center justify-center">
                <EditIcon className={"size-6 text-white hover:cursor-pointer"} onClick={() => handleActionRow(item)} />
              </TableCell>
            }
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}