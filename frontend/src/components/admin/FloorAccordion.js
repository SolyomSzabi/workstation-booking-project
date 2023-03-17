import { useState } from "react";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import AccordionStyle from "../custom-mui/AccordionStyle";
import AccordionSummaryStyle from "../custom-mui/AccordionSummaryStyle";
import AccordionDetailsStyle from "../custom-mui/AccordionDetailsStyle";

import DeleteFormButton from "./DeleteFloorButton";
import EditFloorForm from "./EditFloorForm";

export default function FloorAccordion({ floors, handleDeleteFloor, handleEditFloor }) {
  const [expanded, setExpanded] = useState(false);

  const Accordion = AccordionStyle;
  const AccordionSummary = AccordionSummaryStyle;
  const AccordionDetails = AccordionDetailsStyle;

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleTheDeletedFloor = floor => {
    handleDeleteFloor(floor);
  };
  const handleTheEditedFloor = (floor, index) => {
    handleEditFloor(floor, index);
  };

  return (
    <Stack justifyContent="center" alignItems="center">
      {floors.map((floor, index) => (
        <Accordion
          sx={{ minWidth: 750, mb: 1 }}
          key={floor.floorID}
          expanded={expanded === `panel${floor.floorID}`}
          onChange={handleChange(`panel${floor.floorID}`)}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>{floor.floorName}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <Typography>Capacity: {floor.capacity}</Typography>
              <Typography>Floor Name: {floor.floorName}</Typography>
              <Stack direction="row" spacing={2}>
                <EditFloorForm
                  floor={floor}
                  index={index}
                  handleTheEditedFloor={handleTheEditedFloor}
                />
                <DeleteFormButton level={floor} handleTheDeletedFloor={handleTheDeletedFloor} />
              </Stack>
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
}
