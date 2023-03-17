import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import AddFloorForm from "./AddFloorForm";
import FloorAccordion from "./FloorAccordion";

import { getFloorsByBuildingId } from "../../services/floorService";

/* eslint-disable no-param-reassign */
export default function FloorManagement() {
  const [floors, setFloors] = useState([]);
  const { buildingID } = useParams();

  useEffect(() => {
    const fetchFloors = async () => {
      const { data } = await getFloorsByBuildingId(buildingID);
      setFloors(data);
    };

    fetchFloors();
  }, []);

  const handleAddFloor = newFloor => {
    newFloor.capacity = Number(newFloor.capacity);
    setFloors([...floors, newFloor]);
  };

  const handleEditFloor = (editFloor, index) => {
    editFloor.floorID = Number(editFloor.floorID);
    editFloor.buildingID = Number(editFloor.buildingID);
    editFloor.capacity = Number(editFloor.capacity);
    const updatedLevels = [...floors];
    updatedLevels[index] = editFloor;
    setFloors(updatedLevels);
  };

  const handleDeleteFloor = deleteFloor => {
    deleteFloor.floorID = Number(deleteFloor.floorID);
    deleteFloor.buildingID = Number(deleteFloor.buildingID);
    deleteFloor.capacity = Number(deleteFloor.capacity);
    setFloors(floors.filter(level => level.floorID !== deleteFloor.floorID));
  };

  if (floors.length === 0) {
    return (
      <Stack>
        <Stack sx={{ maxWidth: 750, mb: 5, mx: "auto" }} spacing={40} direction="row">
          <Typography variant="h5">Admin Page - Edit Floor</Typography>
          <AddFloorForm handleAddFloor={handleAddFloor} buildingID={buildingID} />
        </Stack>
        <Typography variant="h6">
          <Stack align="center">There are currently no floors in the building.</Stack>
        </Typography>
      </Stack>
    );
  }
  return (
    <Stack>
      <Stack sx={{ maxWidth: 750, mb: 5, mx: "auto" }} spacing={40} direction="row">
        <Typography variant="h5">Admin Page - Edit Floor</Typography>
        <AddFloorForm handleAddFloor={handleAddFloor} buildingID={buildingID} />
      </Stack>
      <FloorAccordion
        floors={floors}
        handleDeleteFloor={handleDeleteFloor}
        handleEditFloor={handleEditFloor}
      />
    </Stack>
  );
}
