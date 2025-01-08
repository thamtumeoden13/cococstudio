import React from 'react'
import Experience from '@/components/Experience';
import About from '@/components/About';
import Insights from '@/components/Insights';
import Explore from '@/components/Explore';
import Contact from "@/components/Contact";
import { auth, signIn, signOut } from "@/auth";
import { LogIn, LogOut, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { CarouselSpacing } from '@/components/shared/CarouselSpacing';
import { client } from '@/sanity/lib/client';
import { CATEGORY_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import { TableComponent } from '@/components/shared/Table';
import ConstructionTable from '@/components/ConstructionTable';
import { TabManagement } from '@/components/TabManagement';

export const experimental_ppr = true;

const AuthPage = async () => {
  const session = await auth();

  console.log('AuthPage -> session', session)
  const { select: homeHeroPost } = await client.fetch(CATEGORY_BY_SLUG_QUERY, { slug: "home-hero" });

  return (
    <>
      {/* <section className={"pink_container !bg-slate-800 mt-16"}> */}
      <section className={"section_container min-h-[32rem] mt-32 w-full"}>
        {session && session?.user ? (
          <>
            <form action={async () => {
              "use server"
              await signOut({ redirectTo: "/auth" });
            }}
            className=''
            >
              <Button
                type={"submit"}
                className={"startup-form_btn text-white gap-4 !w-[32rem]"}
              // disabled={isPending}
              >
                <span>Logout</span>
                <LogOut className={"size-6 text-white"} />
              </Button>
            </form>
            <section className={"section_container mt-16"}>
              {/* <ConstructionTable /> */}

              <TabManagement />
            </section>
          </>
        )
          : (
            <div className="gap-10 flex flex-col">
              <form action={async () => {
                "use server"
                await signIn('github');
              }}
              >
                <Button
                  type={"submit"}
                  className={"startup-form_btn text-white gap-4"}
                // disabled={isPending}
                >
                  {"Login By GitHub"}
                  <IconBrandGithub className={"size-12"} />
                </Button>
              </form>
              <form action={async () => {
                "use server"
                await signIn('google');
              }}
              >
                <Button
                  type={"submit"}
                  className={"startup-form_btn text-white gap-4 bg-secondary"}
                // disabled={isPending}
                >
                  {"Login By Google"}
                  <IconBrandGoogle className={"size-12"} />
                </Button>
              </form>
            </div>

          )}
      </section>
      {/* </section> */}
    </>
  )
}
export default AuthPage
