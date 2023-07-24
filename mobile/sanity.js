import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const sanityClient = createClient({
  projectId: "4nqxvqfk",
  dataset: "production",
  apiVersion: "2023-07-18",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);
export const generateImgUrl = (source) => builder.image(source);

// Sanity Apis Calls

/**
 * Query all Categories from the sanity backend
 *
 * @return all available categories on the backend
 */
export const fetctCategories = () => {
  return sanityClient.fetch(`
    *[_type == 'category'] {
        name, image, _id
    }`);
};

/**
 * Query all Featured from the sanity backend
 *
 * @return all available featured on the backend
 */
export const fetctFeatured = () => {
  return sanityClient.fetch(`
  *[_type == 'featured'] {
    ...,
    restaurants[]->{
      ...,
      dishes[]->{
        ...,
      }
    }
  }`);
};

export default sanityClient;
