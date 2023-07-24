import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'featured',
  title: 'Featured Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Featured Category Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Featured Category Description',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'restaurants',
      title: 'Restaurants',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'restaurant'}]}],
      validation: (rule) => rule.required(),
    }),
  ],
})
