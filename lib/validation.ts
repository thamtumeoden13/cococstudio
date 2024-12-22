import z from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(1000),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(20),
  link: z.string().url().refine(async (url) => {
    try {
      const res = await fetch(url, {method: "HEAD"});
      const contentType = res.headers.get("content-type");

      return !!contentType?.startsWith("image/");
    } catch (e) {
      return false
    }
  }),
  pitch: z.string().min(10),
})

export const formContactSchema = z.object({
  name: z.string().min(3).max(1000),
  email: z.string().email(),
  message: z.string().min(10)
})
