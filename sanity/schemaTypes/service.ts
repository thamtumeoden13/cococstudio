import { defineField, defineType } from "sanity";
import { Settings } from "lucide-react";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: Settings,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "image",
      type: "url",
    }),
    defineField({
      name: "local_image",
      type: "string",
    }),
    defineField({
      name: "pitch",
      type: "markdown",
    }),
  ],
});
