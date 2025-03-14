import { Box, Select } from "@mantine/core";

/**
 * Interface for a tour option
 * @interface TourOption
 * @property {string} value - The unique identifier for the tour
 * @property {string} label - The display name of the tour
 */
export interface TourOption {
  value: string;
  label: string;
}

/**
 * Props for the TourSelector component
 * @interface TourSelectorProps
 * @property {TourOption[]} tours - Array of available tours
 * @property {string} selectedTour - Currently selected tour value
 * @property {(tour: string) => void} onTourChange - Callback when tour selection changes
 */
interface TourSelectorProps {
  tours: TourOption[];
  selectedTour: string;
  onTourChange: (tour: string) => void;
}

/**
 * Component for selecting a bicycle tour from a dropdown list
 *
 * @component
 * @example
 * ```tsx
 * const tours = [
 *   { value: 'east-hokkaido', label: 'East Hokkaido Tour' },
 *   { value: 'tokyo-osaka', label: 'Tokyo to Osaka' }
 * ];
 *
 * const [selectedTour, setSelectedTour] = useState('east-hokkaido');
 *
 * return (
 *   <TourSelector
 *     tours={tours}
 *     selectedTour={selectedTour}
 *     onTourChange={setSelectedTour}
 *   />
 * );
 * ```
 */
export function TourSelector({
  tours,
  selectedTour,
  onTourChange,
}: TourSelectorProps) {
  return (
    <Box mb="md">
      <Select
        label="Select Tour"
        placeholder="Choose a bicycle tour"
        data={tours}
        value={selectedTour}
        onChange={(value) => value && onTourChange(value)}
        clearable={false}
        allowDeselect={false}
        comboboxProps={{
          position: "bottom",
          shadow: "md",
          withinPortal: true,
          zIndex: 9999,
        }}
        styles={{
          input: {
            cursor: "pointer",
          },
        }}
      />
    </Box>
  );
}
