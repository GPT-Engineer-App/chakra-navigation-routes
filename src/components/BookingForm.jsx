import React, { useState, useEffect } from "react";
import { Box, Heading, Input, Select, Button, Text, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import InteractiveMap from "./InteractiveMap";

const API_URL = "/locationCosts";

const BookingForm = () => {
  const [serviceType, setServiceType] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [distance, setDistance] = useState(0);

  const navigate = useNavigate();

  const [locationCosts, setLocationCosts] = useState([]);

  useEffect(() => {
    fetchLocationCosts();
  }, []);

  const fetchLocationCosts = async () => {
    try {
      const response = await fetch(`${API_URL}/location-costs`);
      if (response.ok) {
        const data = await response.json();
        setLocationCosts(data);
      } else {
        console.error("Failed to fetch location costs");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const calculateCost = () => {
    const baseCost = serviceType === "towing" ? 50 : serviceType === "flatbed" ? 75 : 30;
    const distanceCost = distance * 2;
    const locationCost = locationCosts.find((cost) => cost.origin === origin && cost.destination === destination)?.cost || 0;
    return baseCost + distanceCost + locationCost;
  };

  const handleBooking = () => {
    const cost = calculateCost();

    navigate("/booking-confirmation", {
      state: {
        serviceType,
        name,
        phone,
        vehicleMake,
        vehicleModel,
        origin,
        destination,
        dateTime,
        distance,
        cost,
      },
    });
  };

  return (
    <Box>
      <Heading size="md" mb={4}>
        Book a Tow Truck Service
      </Heading>
      <Select placeholder="Select service type" value={serviceType} onChange={(e) => setServiceType(e.target.value)} mb={4}>
        <option value="towing">Towing</option>
        <option value="flatbed">Flatbed</option>
        <option value="roadside">Roadside Assistance</option>
      </Select>
      <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} mb={4} />
      <Input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} mb={4} />
      <Input placeholder="Vehicle Make" value={vehicleMake} onChange={(e) => setVehicleMake(e.target.value)} mb={4} />
      <Input placeholder="Vehicle Model" value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} mb={4} />
      <InteractiveMap setDestination={setDestination} setDistance={setDistance} />
      <Text mb={4}>Total Distance: {distance} km</Text>
      <Input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} mb={4} />
      <Button colorScheme="teal" _hover={{ transform: "scale(1.05)" }} onClick={handleBooking}>
        Confirm Booking
      </Button>
    </Box>
  );
};

export default BookingForm;
