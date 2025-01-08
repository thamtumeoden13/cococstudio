import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image";

export const TableComponent = ({ data, title, className, }:
  {
    data: any[];
    title: string;
    className?: string;
  }
) => {

  return (
    <Table className="">
      {/* <TableCaption>{title}</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="text-20-medium !text-white">Title</TableHead>
          <TableHead className="text-20-medium !text-white">Permalink</TableHead>
          <TableHead className="text-20-medium !text-white">Thumbnail</TableHead>
          <TableHead className="text-20-medium !text-white">Description</TableHead>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}