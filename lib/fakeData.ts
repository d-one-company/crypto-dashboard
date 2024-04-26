import { faker } from '@faker-js/faker';

export function generateFakeImage({
  width = 64,
  height = 64,
}: {
  width?: number;
  height?: number;
}) {
  return faker.image.url({ width, height });
}
