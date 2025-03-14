import { Accordion, Box, Paper, Text, Title } from "@mantine/core";
import ReactMarkdown from "react-markdown";

/**
 * Props for the TourDescription component
 * @interface TourDescriptionProps
 * @property {string} tourId - The ID of the selected tour
 */
interface TourDescriptionProps {
  tourId: string;
}

// Tour descriptions organized by tour ID
const tourDescriptions: Record<string, string> = {
  "east-hokkaido": `
# East Hokkaido Tour: A 6-Day Cycling Adventure

My adventure through Eastern Hokkaido was a perfect blend of stunning landscapes, serene wilderness, and refreshing onsen experiences. Here's how my route unfolded:

- **Starting Point**: Took a train to Shiretoko-Shari
- **Main Journey**: Biked from Shiretoko-Shari back to Kushiro over 6 days
- **Return**: Trained back from Kushiro

## Day-by-Day Journey

### Day 1: Shari to Utoro + Ride into Shiretoko Park

As I left Shari, I encountered moderate truck traffic and tried to stick to side roads whenever possible. The ride improved dramatically as I approached Shiretoko National Park, with fewer vehicles and more breathtaking scenery.

The ride into Shiretoko was particularly memorable—the winding roads offering glimpses of the peninsula's famous wilderness. If you have extra time in your itinerary, I'd highly recommend stopping for a hike at one of several trailheads along the route.

### Day 2: Utoro to Rausu + Exploring East Side of Shiretoko

The east side of the Shiretoko Peninsula provided some of the most peaceful riding of the entire trip. The coastal road north of Rausu was exceptionally quiet, with very little traffic. I was excited to reach the northernmost point accessible by road in Hokkaido, though I was surprised to find no marker commemorating this geographic milestone.

**Lodging in Rausu**: I stayed at Bear Elephant after securing a last-minute room. I had originally planned to stay at the campsite across from Rausu's free onsen, but it was closed.

**Onsen Experiences**:
1. **Rausu Free Onsen** - Wonderfully hot and rejuvenating!
2. **Rotemburo** (ocean-side) on the east side of the peninsula - A unique experience with ocean views, though perhaps not as relaxing as other onsens I visited.

### Day 3: Rausu to Nakashibetsu

The journey from the coastal town of Rausu inland to Nakashibetsu offered a transition from maritime landscapes to more pastoral scenery. The gradual change in elevation and ecosystem provided a fascinating contrast to the previous days.

### Day 4: Nakashibetsu to Wakoto (Lake Kussharo)

This segment brought me to the stunning caldera lake of Kussharo, one of Eastern Hokkaido's natural treasures. The Wakoto Peninsula, which juts into the lake, became my home for the night.

**Onsen Experience**: The free onsen on the Wakoto Peninsula near the campsite was a highlight—soaking in the thermal waters while overlooking the vast lake created a magical experience I won't soon forget.

### Day 5: Lake Kussharo to Lake Akan

Continuing my journey through Hokkaido's volcanic lake district, I rode from Lake Kussharo to Lake Akan. The route provided glimpses of the region's unique geography shaped by ancient volcanic activity.

### Day 6: Akan to Kushiro

On my final day, I rode from Lake Akan to Kushiro, where I concluded my cycling adventure. Toward the end of this segment, I serendipitously found myself on a dedicated cycling path leading into Kushiro—a pleasant surprise that made for a smooth finish to the journey.

## Route Reflections

If you're planning your own Eastern Hokkaido cycling adventure, here are some thoughts based on my experience:

- **Alternative Starting Point**: Consider starting from Abashiri instead of Shari. I noticed several cycling tours beginning there, and it looked like a pleasant route.

- **Explore Shiretoko Further**: With more time, I would have explored deeper into Shiretoko Park, particularly the western side which I didn't get to experience fully.

- **Side Trips**: Onneto Lake near Lake Akan came highly recommended but wasn't on my route. It might be worth the detour!

- **Research Cycling Paths**: Try to locate official cycling paths and scenic roads before your trip. I planned each day's route the night before using Strava and RideWithGPS on my phone, which worked but likely meant missing some hidden gems.

- **Road Safety**: Fortunately, I encountered very few intimidating roads throughout Eastern Hokkaido. Most routes were relatively quiet and cyclist-friendly, even without dedicated cycling infrastructure.

- **Kushiro Cycling**: Look for maps of official cycling paths near Kushiro—the network seems extensive but not well-documented online.

Overall, Eastern Hokkaido offered an incredible cycling experience with its combination of coastal roads, volcanic lakes, and abundant hot springs. The region's relatively low traffic volume and stunning natural landscapes make it an ideal destination for bicycle touring.
  `,
  "tokyo-osaka": `
# Tokyo to Osaka: A Classic 5-Day Cycling Route

This iconic route takes you through the heart of Japan, connecting the country's two largest metropolitan areas while showcasing beautiful coastal and mountain scenery along the way.

- **Starting Point**: Tokyo
- **Main Journey**: Tokyo → Hakone → Shizuoka → Nagoya → Kyoto → Osaka
- **Distance**: Approximately 500km over 5 days

## Highlights

- Spectacular views of Mt. Fuji from the Hakone region
- Coastal riding along parts of the historic Tokaido route
- Cultural experiences in Kyoto, Japan's ancient capital
- Diverse scenery from urban landscapes to rural countryside

*Note: This is a placeholder description. A detailed day-by-day account will be added based on actual touring experience.*
  `,
};

/**
 * Component for displaying a narrative description of a bicycle tour
 *
 * @component
 * @example
 * ```tsx
 * <TourDescription tourId="east-hokkaido" />
 * ```
 */
export function TourDescription({ tourId }: TourDescriptionProps) {
  // Get the description for the selected tour, or use empty string as fallback
  const description = tourDescriptions[tourId] || "";

  return (
    <Paper withBorder p="md" radius="md">
      <Title order={3} mb="md">
        Tour Description
      </Title>

      <Accordion defaultValue="overview">
        <Accordion.Item value="overview">
          <Accordion.Control>Overview</Accordion.Control>
          <Accordion.Panel>
            <Box className="markdown-content">
              <ReactMarkdown>
                {description.split("## Day-by-Day Journey")[0]}
              </ReactMarkdown>
            </Box>
          </Accordion.Panel>
        </Accordion.Item>

        {description.includes("## Day-by-Day Journey") && (
          <Accordion.Item value="day-by-day">
            <Accordion.Control>Day-by-Day</Accordion.Control>
            <Accordion.Panel>
              <Box className="markdown-content">
                <ReactMarkdown>
                  {
                    description
                      .split("## Day-by-Day Journey")[1]
                      .split("## Route Reflections")[0]
                  }
                </ReactMarkdown>
              </Box>
            </Accordion.Panel>
          </Accordion.Item>
        )}

        {description.includes("## Route Reflections") && (
          <Accordion.Item value="reflections">
            <Accordion.Control>Route Tips</Accordion.Control>
            <Accordion.Panel>
              <Box className="markdown-content">
                <ReactMarkdown>
                  {description.split("## Route Reflections")[1]}
                </ReactMarkdown>
              </Box>
            </Accordion.Panel>
          </Accordion.Item>
        )}
      </Accordion>

      {!description && (
        <Text color="dimmed" fs="italic">
          No description available for this tour.
        </Text>
      )}
    </Paper>
  );
}
