"use client";

import { Link as LinkScroll } from "react-scroll";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { client } from "@/sanity/lib/client";
import { CATEGORY_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { Author, Construction, Project } from "@/sanity/types";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

export type ProjectCardType = Omit<Project, "author" | "construction"> & {
  author?: Author;
} & { construction?: Construction };

const Header = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const navContainerRef = useRef<HTMLDivElement>(null);

  const { y: currenScrollY } = useWindowScroll();

  const [isOpen, setIsOpen] = useState(false);

  const [active, setActive] = useState<string | null>(null);

  const [navConstructionRouter, setNavConstructionRouter] = useState<
    ProjectCardType[]
  >([]);
  const [navDesignRouter, setNavDesignRouter] = useState<ProjectCardType[]>([]);

  const handleIsOpen = (isOpen: boolean) => {
    setIsOpen(isOpen);
    if (isOpen) {
      setActive(null);
    }
  };

  useEffect(() => {
    const getNavDesignRouter = async () => {
      const { select: navDesignRouter } = await client.fetch(
        CATEGORY_BY_SLUG_QUERY,
        { slug: "danh-muc-san-pham" }
      );
      setNavDesignRouter(navDesignRouter);
    };

    const getNavProjectRouter = async () => {
      const { select: navConstructionRouter } = await client.fetch(
        CATEGORY_BY_SLUG_QUERY,
        { slug: "danh-muc-du-an" }
      );
      setNavConstructionRouter(navConstructionRouter);
    };

    getNavDesignRouter();
    getNavProjectRouter();
  }, []);

  useEffect(() => {
    if (currenScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currenScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
    } else if (currenScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }

    setLastScrollY(currenScrollY);
  }, [currenScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  // eslint-disable-next-line react/prop-types
  const NavLink = ({ name, route }: { name: string; route?: string }) => {
    if (route) {
      return (
        <Link
          href={route}
          className={
            "base-bold text-p4 uppercase transition-colors duration-500 cursor-pointer hover:text-p1 max-lg:my-4 max-lg:h5"
          }
          onClick={() => setIsOpen(false)}
        >
          {name}
        </Link>
      );
    }
    return (
      <LinkScroll
        to={name}
        offset={-100}
        spy
        smooth
        activeClass={"nav-active"}
        className={
          "base-bold text-p4 uppercase transition-colors duration-500 cursor-pointer hover:text-p1 max-lg:my-4 max-lg:h5"
        }
        onClick={() => setIsOpen(false)}
      >
        {name}
      </LinkScroll>
    );
  };

  return (
    <div
      ref={navContainerRef}
      className={clsx(
        "fixed inset-x-0 z-50 h-16  py-10 max-lg:py-4 transition-all duration-700 border-none top-0 left-0 w-full bg-black"
      )}
    >
      <header
        className={"absolute w-full -translate-y-1/2 top-1/2"}
      >
        <div className={"container flex h-14 items-center max-lg:px-5"}>
          <Link href={"/"} className={"lg:hidden flex-1 cursor-pointer z-2"}>
            <Image
              src="/logo-cococstudio.png"
              alt="Logo Cốc Cốc Studio"
              width={60}
              height={30}
            />
          </Link>

          <div
            className={clsx(
              "w-full max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-full max-lg:bg-s2 max-lg:opacity-0",
              isOpen ? "max-lg:opacity-100" : "max-lg:pointer-events-none"
            )}
          >
            <div
              className={
                "w-full max-lg:relative max-lg:flex max-lg:flex-col max-lg:min-h-screen max-lg:p-6 max-lg:overflow-hidden sidebar-before max-md:px-4"
              }
            >
              <Menu setActive={setActive}>
                <ul className={"flex max-lg:block max-lg:px-12 max-w-7xl"}>
                  <li className={"nav-logo"}>
                    <Link
                      href={`/`}
                      className={clsx(
                        "max-lg:hidden transition-transform duration-500 cursor-pointer"
                      )}
                    >
                      <Image
                        src="/logo-cococstudio.png"
                        alt="Logo Cốc Cốc Studio"
                        width={60}
                        height={30}
                      />
                    </Link>
                  </li>
                  <li className={"nav-li max-lg:mb-4"}>
                    <NavLink name={"Trang Chủ"} route={"/"} />
                    {/* <div className={"dot"} /> */}
                  </li>
                  <li className={"nav-li max-lg:mb-4"}>
                    <MenuItem
                      setActive={setActive}
                      active={active}
                      item="product"
                      name={"Sản Phẩm"}
                      route={"/san-pham"}
                      setIsOpen={handleIsOpen}
                    >
                      <div className="grid grid-cols-2 gap-10 p-4 max-lg:grid-cols-1 text-md ">
                        {navDesignRouter.map(
                          ({ _id, title, slug, thumbnail, subtitle }) => (
                            <ProductItem
                              key={_id}
                              title={title!}
                              href={`/du-an/${slug?.current}`}
                              src={thumbnail!}
                              description={subtitle!}
                              setIsOpen={handleIsOpen}
                            />
                          )
                        )}
                      </div>
                    </MenuItem>
                  </li>
                  <li className={"nav-li"}>
                    {/* <MenuItem
                      setActive={setActive}
                      active={active}
                      item="project"
                      name={"Dự Án"}
                      route={"/du-an"}
                      setIsOpen={handleIsOpen}
                    >
                      <div className="grid grid-cols-2 gap-10 p-4 max-lg:grid-cols-1 text-md ">
                        {navConstructionRouter.map(
                          ({ _id, title, slug, thumbnail, subtitle }) => (
                            <ProductItem
                              key={_id}
                              title={title!}
                              href={`/du-an/${slug?.current}`}
                              src={thumbnail!}
                              description={subtitle!}
                              setIsOpen={handleIsOpen}
                            />
                          )
                        )}
                      </div>
                    </MenuItem> */}
                    {/* <div className={"dot"} /> */}
                    <NavLink name={"Thông Tin"} route={"/thong-tin"} />
                  </li>
                </ul>
              </Menu>

              <div
                className={
                  "lg:hidden block absolute top-1/2 left-0 w-[960px] h-[380px] translate-x-[-290px] -translate-y-1/2 rotate-90"
                }
              >
                <Image
                  src="/images/bg-outlines.svg"
                  alt=""
                  width={960}
                  height={380}
                  className={"relative z-2"}
                />
                <Image
                  src="/images/bg-outlines-fill.png"
                  alt=""
                  width={960}
                  height={380}
                  className={"absolute inset-0 mix-blend-soft-light opacity-5"}
                />
              </div>
            </div>
          </div>

          <button
            className={
              "lg:hidden z-2 size-10 border-2 border-s4/25 rounded-full flex justify-center items-center"
            }
            onClick={() => handleIsOpen(!isOpen)}
          >
            <img
              src={`/images/${isOpen ? "close" : "magic"}.svg`}
              alt="magic"
              className={"size-1/2 object-contain"}
            />
          </button>
        </div>
      </header>
    </div>
  );
};
export default Header;
