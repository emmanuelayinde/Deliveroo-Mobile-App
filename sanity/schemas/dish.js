import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'dish',
  title: 'Dish',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name of Dish',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Dish Description',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price of the dish in USD $',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image of dish',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
  ],
})
