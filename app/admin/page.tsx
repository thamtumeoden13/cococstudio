"use client";
import Image from "next/image";
import { Plus, Calendar, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Dashboard() {
  return (
    <div className="w-full min-h-screen bg-slate-50">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-600">Borrowed Books</h3>
              <div className="flex items-center text-amber-500">
                <ArrowDown className="w-4 h-4 mr-1" />
                <span>2</span>
              </div>
            </div>
            <p className="text-3xl font-bold">145</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-600">Total Users</h3>
              <div className="flex items-center text-green-500">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span>4</span>
              </div>
            </div>
            <p className="text-3xl font-bold">317</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-600">Total Books</h3>
              <div className="flex items-center text-green-500">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span>2</span>
              </div>
            </div>
            <p className="text-3xl font-bold">163</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
        {/* Borrow Requests */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Borrow Requests
            </h2>
            <Button variant="link" className="text-indigo-600">
              View all
            </Button>
          </div>
          <Card className="bg-white">
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px] text-center">
              <div className="mb-4">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="No requests"
                  width={100}
                  height={100}
                  className="opacity-30"
                />
              </div>
              <h3 className="mb-1 text-lg font-medium text-gray-900">
                No Pending Book Requests
              </h3>
              <p className="text-sm text-gray-500">
                There are no borrow book requests awaiting your review at this
                time.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recently Added Books */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Recently Added Books
            </h2>
            <Button variant="link" className="text-indigo-600">
              View all
            </Button>
          </div>
          <Card className="bg-white">
            <CardContent className="p-6">
              <Button
                variant="outline"
                className="w-full mb-6 text-gray-600 border-2 border-dashed"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Book
              </Button>

              <div className="space-y-4">
                {[
                  {
                    title: "The Great Reclamation: A Novel by Rachel Heng",
                    author: "Rachel Heng",
                    genre: "Strategic, Fantasy",
                    date: "12/01/24",
                    cover: "/placeholder.svg?height=60&width=45",
                  },
                  {
                    title: "Inside Evil: Inside Evil Series, Book 1",
                    author: "Rachel Heng",
                    genre: "Strategic, Fantasy",
                    date: "12/01/24",
                    cover: "/placeholder.svg?height=60&width=45",
                  },
                  {
                    title: "Jayne Castle - People in Glass Houses",
                    author: "Rachel Heng",
                    genre: "Strategic, Fantasy",
                    date: "12/01/24",
                    cover: "/placeholder.svg?height=60&width=45",
                  },
                  {
                    title: "The Great Reclamation: A Novel by Rachel Heng",
                    author: "Rachel Heng",
                    genre: "Strategic, Fantasy",
                    date: "12/01/24",
                    cover: "/placeholder.svg?height=60&width=45",
                  },
                  {
                    title: "Inside Evil: Inside Evil Series, Book 1",
                    author: "Rachel Heng",
                    genre: "Strategic, Fantasy",
                    date: "12/01/24",
                    cover: "/placeholder.svg?height=60&width=45",
                  },
                  {
                    title: "Jayne Castle - People in Glass Houses",
                    author: "Rachel Heng",
                    genre: "Strategic, Fantasy",
                    date: "12/01/24",
                    cover: "/placeholder.svg?height=60&width=45",
                  },
                ].map((book, index) => (
                  <div key={index} className="flex gap-3">
                    <Image
                      src={book.cover || "/placeholder.svg"}
                      alt={book.title}
                      width={45}
                      height={60}
                      className="object-cover rounded-sm"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {book.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        By {book.author} • {book.genre}
                      </p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {book.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Account Requests */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Account Requests
          </h2>
          <Button variant="link" className="text-indigo-600">
            View all
          </Button>
        </div>
        <Card className="bg-white">
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px] text-center">
            <div className="mb-4">
              <Image
                src="/placeholder.svg?height=100&width=100"
                alt="No requests"
                width={100}
                height={100}
                className="opacity-30"
              />
            </div>
            <h3 className="mb-1 text-lg font-medium text-gray-900">
              No Pending Account Requests
            </h3>
            <p className="text-sm text-gray-500">
              There are currently no account requests awaiting approval.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* User Avatar */}
      <div className="fixed transform -translate-x-1/2 top-6 left-1/2 md:left-auto md:right-16 md:transform-none">
        <Avatar className="w-12 h-12 border-2 border-white shadow-md">
          <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Adrian" />
          <AvatarFallback>V</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
