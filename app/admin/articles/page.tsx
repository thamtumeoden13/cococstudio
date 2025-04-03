"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, ExternalLink, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type User = {
  id: string
  name: string
  email: string
  dateJoined: string
  role: "User" | "Admin"
  booksBorrowed: number
  universityIdNo: string
}

const data: User[] = [
  {
    id: "1",
    name: "Darrell Steward",
    email: "darrellsteward@gmail.com",
    dateJoined: "Dec 19 2023",
    role: "User",
    booksBorrowed: 10,
    universityIdNo: "90324423789",
  },
  {
    id: "2",
    name: "Marc Atenson",
    email: "marcinee@mial.com",
    dateJoined: "Dec 19 2023",
    role: "Admin",
    booksBorrowed: 32,
    universityIdNo: "90324423789",
  },
  {
    id: "3",
    name: "Susan Drake",
    email: "contact@susandrake.io",
    dateJoined: "Dec 19 2023",
    role: "User",
    booksBorrowed: 13,
    universityIdNo: "90324423789",
  },
  {
    id: "4",
    name: "Darrell Steward",
    email: "darrellsteward@gmail.com",
    dateJoined: "Dec 19 2023",
    role: "Admin",
    booksBorrowed: 10,
    universityIdNo: "90324423789",
  },
  {
    id: "5",
    name: "Marc Atenson",
    email: "marcinee@mial.com",
    dateJoined: "Dec 19 2023",
    role: "User",
    booksBorrowed: 32,
    universityIdNo: "90324423789",
  },
  {
    id: "6",
    name: "Susan Drake",
    email: "contact@susandrake.io",
    dateJoined: "Dec 19 2023",
    role: "User",
    booksBorrowed: 13,
    universityIdNo: "90324423789",
  },
]

export default function UsersTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [userData, setUserData] = useState<User[]>(data)

  const handleRoleChange = (userId: string, newRole: "User" | "Admin") => {
    setUserData((prevData) => prevData.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))
  }

  const handleDeleteUser = (userId: string) => {
    setUserData((prevData) => prevData.filter((user) => user.id !== userId))
  }

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const user = row.original
        const initials = user.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()

        return (
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={user.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{user.name}</span>
              <span className="text-sm text-muted-foreground">{user.email}</span>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "dateJoined",
      header: "Date Joined",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const user = row.original
        const roleColor = user.role === "Admin" ? "text-green-500" : "text-pink-500"

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={`px-2 py-1 h-auto font-medium ${roleColor}`}>
                {user.role}
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuRadioGroup
                value={user.role}
                onValueChange={(value: string) => handleRoleChange(user.id, value as "User" | "Admin")}
              >
                <DropdownMenuRadioItem value="User" className="text-pink-500">
                  User
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Admin" className="text-green-500">
                  Admin
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
    {
      accessorKey: "booksBorrowed",
      header: "Books Borrowed",
    },
    {
      accessorKey: "universityIdNo",
      header: "University ID No",
    },
    {
      accessorKey: "universityIdCard",
      header: "University ID Card",
      cell: () => (
        <Button variant="link" className="h-auto p-0 text-blue-500">
          View ID Card <ExternalLink className="w-4 h-4 ml-1" />
        </Button>
      ),
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const user = row.original

        return (
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-red-500"
            onClick={() => handleDeleteUser(user.id)}
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        )
      },
    },
  ]

  const table = useReactTable({
    data: userData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <section className='w-full bg-white rounded-2xl p-7'>

      <div className="w-full p-6 bg-white rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">All Users</h1>
          <div className="flex items-center gap-2">

            <Button variant="ghost" size="sm">
              A-Z
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <ArrowUpDown className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-slate-50">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}

