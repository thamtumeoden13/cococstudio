import React from 'react'
import Link from "next/link";
import Image from "next/image";
import {auth, signIn, signOut} from "@/auth";
import {BadgePlus, BadgePlusIcon, LogOut} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className={"px-5 py-3 bg-white shadow-sm font-ibm-plex"}>
      <nav className={"flex justify-between items-center"}>
        <Link href={"/"}>
          <Image src={"/slogan.svg"} alt={"Logo Cốc Cốc Studio"} width={144} height={30}/>
        </Link>

        <div className={"flex items-center gap-5 text-black "}>
          {session && session?.user ? (
            <>
              <Link href={"/startup/create"}>
                <span className={"max-sm:hidden"}>Create</span>
                <BadgePlus className={"size-6 sm:hidden"}/>
              </Link>
              <form action={async () => {
                "use server"
                await signOut({redirectTo: "/"});
              }}>
                <button type={"submit"}>
                  <span className={"max-sm:hidden"}>Đăng Xuất</span>
                  <LogOut className={"size-6 sm:hidden text-red-500"}/>
                </button>
              </form>
              <Link href={`/app/(root)/user/${session?._id}`}>
                <Avatar className={"size-10"}>
                  <AvatarImage
                    src={session?.user?.iamge || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>{"AV"}</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form action={async () => {
              "use server"
              await signIn('github');
            }}>
              <button type={"submit"}>
                Đăng Nhập
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  )
}
export default Navbar
