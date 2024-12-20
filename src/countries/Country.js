/**
 * Logic example of field url in Country
 *
 * @export
 * @param {*} parent - Data of Country
 * @param {*} args - GraphQL arguments.
 * @param {*} context - Apollo Context Data.
 * @return {*} Return a string of example
 */
export async function url(parent, args, context) {
  // Si no existe url en parent, retornamos google.com
  if (!parent.url) {
    return 'https://www.google.com'
  }
  return parent.url
}

/**
 * Logic example of field image in Country
 *
 * @export
 * @param {*} parent - Data of Country
 * @param {*} args - GraphQL arguments.
 * @param {*} context - Apollo Context Data.
 * @return {*} Return a string of example
 */
export async function image(parent, args, context) {
  // Si no existe image en parent, retornamos una url de una imagen de google
  if (!parent.image) {
    return 'https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg'
  }
  return parent.image
}
