import { Box, Image, SimpleGrid, Stack, Text } from "@mantine/core";

/**
 * Interface for photo data
 * @interface Photo
 * @property {string} src - The source URL of the photo
 * @property {string} alt - Alt text for the photo
 * @property {string} caption - Caption text to display below the photo
 */
export interface Photo {
  src: string;
  alt: string;
  caption: string;
}

/**
 * Props for the PhotoGallery component
 * @interface PhotoGalleryProps
 * @property {Photo[]} photos - Array of photos to display
 */
interface PhotoGalleryProps {
  photos: Photo[];
}

/**
 * Displays a responsive grid of photos with captions
 *
 * This component shows a collection of photos in a responsive grid layout.
 * Each photo includes a caption displayed below the image.
 * The grid automatically adjusts based on screen size.
 *
 * @component
 * @example
 * ```tsx
 * const photos = [
 *   {
 *     src: "/images/bicycle-tour/tokyo.jpg",
 *     alt: "Tokyo skyline",
 *     caption: "Starting point: Tokyo"
 *   },
 *   {
 *     src: "/images/bicycle-tour/kyoto.jpg",
 *     alt: "Kyoto temple",
 *     caption: "Beautiful temples in Kyoto"
 *   }
 * ];
 *
 * return <PhotoGallery photos={photos} />;
 * ```
 */
export function PhotoGallery({ photos }: PhotoGalleryProps) {
  return (
    <Box>
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: photos.length > 2 ? 3 : 2 }}
        spacing="md"
        verticalSpacing="md"
      >
        {photos.map((photo, index) => (
          <Stack key={index} gap="xs">
            <Image
              src={photo.src}
              alt={photo.alt}
              radius="md"
              fit="cover"
              height={200}
              fallbackSrc="/images/bicycle-tour/placeholder.jpg"
            />
            <Text size="sm" c="dimmed" ta="center">
              {photo.caption}
            </Text>
          </Stack>
        ))}
      </SimpleGrid>
    </Box>
  );
}
