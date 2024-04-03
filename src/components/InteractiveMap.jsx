import React from "react";
import { Box } from "@chakra-ui/react";

const InteractiveMap = ({ setDestination, setDistance }) => {
  const handleMapInteraction = () => {
    const mapData = {
      origin: "Sample Origin",
      destination: "Sample Destination",
      distance: 10,
    };
    // Call the passed functions with hardcoded data
    setDestination(mapData.destination);
    setDistance(mapData.distance);
  };

  return (
    <Box width="100%" height="300px" bg="gray.200" mb={4} display="flex" alignItems="center" justifyContent="center" onClick={handleMapInteraction} cursor="pointer">
      Interactive Map Placeholder
    </Box>
  );
};

export default InteractiveMap;
