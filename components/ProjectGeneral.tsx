// "use client";

import React, { } from 'react'

import Image from "next/image"
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger
} from "./ui/animated-modal"
import { imageSliders } from "@/constants";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { StartupCardType } from './StartupCard';
import markdownit from "markdown-it";
import { notFound } from 'next/navigation';

const md = markdownit();

const ProjectGeneral = ({ post }: { post: StartupCardType }) => {

  // const [imageSelected, setImageSelected] = useState<string>(imageSliders[0]?.img || '');

  // const handleImageSelected = (image: string) => {
  //   setImageSelected(image)
  // }

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || '');

  return (
    <TracingBeam className="px-6 max-w-7xl">
      <div className="mx-auto antialiased pt-4 relative">

        <div className={"space-y-5 mt-10 px-4 max-w-6xl mx-auto"}>
          <div className={"flex-between gap-5"}>
            <Link
              href={`/app/(root)/user/${post?.author?._id}`}
              className={"flex gap-2 items-center mb-3"}
            >
              <Image
                src={post?.author?.image || ""}
                alt={"avatar"}
                width={64}
                height={64}
                className={"rounded-full drop-shadow-lg"}
              />

              <div>
                <p className={"text-20-medium"}>{post?.author?.name}</p>
                <p className={"text-16-medium !text-black-300"}>
                  {post.author?.username}
                </p>
              </div>
            </Link>

            <p className={"category-tag"}>{post.category}</p>
          </div>
          <div className="text-sm prose max-w-7xl dark:prose-invert">
            {post?.image && (
              <Modal>
                <ModalTrigger
                  className="flex justify-center group/modal-btn">
                  <Image
                    src={post.image}
                    alt="blog thumnail"
                    height="1000"
                    width="1000"
                    className="rounded-lg mb-10 object-cover"
                  />
                </ModalTrigger>
                <ModalBody className="md:max-w-[80%]">
                  <ModalContent>
                    <h4
                      className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                      Book your trip to{" "}
                      <span
                        className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                        Bali
                      </span>{" "}
                      now! ✈️
                    </h4>
                    <div className="flex justify-center items-center gap-6">
                      {imageSliders.map(({ id, title, desc, img, }, idx) => (
                        // <motion.div
                        //   key={"images" + idx}
                        //   style={{
                        //     rotate: Math.random() * 20 - 10,
                        //   }}
                        //   whileHover={{
                        //     scale: 1.1,
                        //     rotate: 0,
                        //     zIndex: 100,
                        //   }}
                        //   whileTap={{
                        //     scale: 1.1,
                        //     rotate: 0,
                        //     zIndex: 100,
                        //   }}
                        //   onClick={() => handleImageSelected(img)}
                        //   // onSelect={() => handleImageSelected(image)}
                        //   className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
                        // >
                        <Image
                          key={id}
                          src={img}
                          alt="bali images"
                          width="500"
                          height="500"
                          className="rounded-lg h-16 w-16 md:h-20 md:w-20 object-cover flex-shrink-0"
                        />
                        // </motion.div>
                      ))}
                    </div>
                    {/*<div*/}
                    {/*  className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">*/}
                    {/*  <Image*/}
                    {/*    src={imageSelected}*/}
                    {/*    alt="blog thumnail"*/}
                    {/*    height="2000"*/}
                    {/*    width="2000"*/}
                    {/*    className="rounded-lg mb-10 object-cover"*/}
                    {/*  />*/}
                    {/*</div>*/}
                  </ModalContent>
                  {/* <ModalFooter className="gap-4">
                        <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
                          Cancel
                        </button>
                        <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
                          Book Now
                        </button>
                      </ModalFooter> */}
                </ModalBody>
              </Modal>
            )}

            {/* {item.description} */}
          </div>

          <h3 className={"text-30-bold"}>Pitch Details</h3>
          {parsedContent ? (
            <article
              className={"prose max-w-7xl font-work-sans break-all"}
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className={"no-result"}>No details provided</p>
          )}
        </div>
      </div>
    </TracingBeam>
  )
}

export default ProjectGeneral
