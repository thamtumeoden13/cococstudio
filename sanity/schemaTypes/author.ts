import {defineField, defineType} from "sanity";
import {UsersIcon} from "lucide-react";

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'id',
      type: 'string'
    }),
    defineField({
      name: 'name',
      type: 'string'
    }),
    defineField({
      name: 'username',
      type: 'string'
    }),
    defineField({
      name: 'email',
      type: 'string'
    }),
    defineField({
      name: 'image',
      type: 'url'
    }),
    defineField({
      name: 'bio',
      type: 'text'
    }),
  ],
  preview: {
    select: {
      title: 'name'
    }
  }
})