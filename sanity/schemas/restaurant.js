import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Restaurant Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'short_description',
      title: 'Short Description',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image of the Restaurant',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'latititude',
      title: 'Latitude of the Restaurant',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'longitude',
      title: 'Longitude of the Restaurant',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Restaurant address',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Enter a rating (from 1 - 5)',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(5).error('Rating must be from 1 - 5'),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'dishes',
      title: 'Dishes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'dish'}]}],
      validation: (rule) => rule.required(),
    }),
  ],
})
