/*eslint-disable*/

import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { experimentalStyled as styled } from "@mui/material/styles";

import { Button } from "@mui/material";
import DatePicker from "./DatePicker";

import { getWorkstations, getFloors, getBookings } from "../../services/WorkstationService";
import { getBuildings } from "../../services/BuildingService";
import DeleteWorkstation from "./DeleteWorkstation";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  Height: "300px",
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary
}));

export default function WorkstationsTable({ handleDeleteWorkstation }) {
  const [date, setDate] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [cities, setCities] = useState([]);
  const [floors, setFloors] = useState([]);
  const [floorsInABuilding, setFloorsInABuilding] = useState([]);
  const [workstations, setWorkstations] = useState([]);
  const [workstationsOnAFloor, setWorkstationsOnAFloor] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [bookingsOnADate, setBookingsOnADate] = useState([]);
  const [workstationsWithBackgroundColor, setWorkstationsWithBackgroundColor] = useState([]);

  useEffect(() => {
    getBuildings().then(queryData => {
      setCities(queryData.data);
    });
    getFloors().then(queryData => {
      setFloors(queryData.data);
    });
    getWorkstations().then(queryData => {
      setWorkstations(queryData.data);
    });
    getBookings().then(queryData => {
      setBookings(queryData.data);
    });
  }, []);

  const handleSelectCityChange = event => {
    setSelectedCity(event.target.value);
    const buildingsInACity = cities.filter(building => building.city === event.target.value);
    setBuildings(buildingsInACity[0].buildings);
  };

  const handleSelectBuildingChange = e => {
    setSelectedBuilding(e.target.value);
    setFloorsInABuilding(floors.filter(floor => floor.building.name === e.target.value));
  };

  const handleSelectFloorChange = e => {
    setSelectedFloor(e.target.value);
    setWorkstationsOnAFloor(
      workstations.filter(workstation => workstation.floor.floorName === e.target.value)
    );
  };

  const hanleDateBlur = () => {
    const pickedDateYear = date.$y;
    let pickedDateMonth = Number(date.$M) + 1;
    if (pickedDateMonth < 10) {
      pickedDateMonth = `0${pickedDateMonth}`;
    }
    let pickedDateDay = Number(date.$D) - 1;
    if (pickedDateDay < 10) {
      pickedDateDay = `0${pickedDateDay}`;
    }
    const pickedDate = `${pickedDateYear}-${pickedDateMonth}-${pickedDateDay}`;
    setBookingsOnADate(bookings.filter(booking => booking.date.substring(0, 10) === pickedDate));
  };

  const handleGetBookingsButtonClick = () => {
    const workstationsWithBackgroundColor = workstationsOnAFloor.map(workstation => ({
      workstation,
      backgroundColor: "green"
    }));
    for (let i = 0; i < bookingsOnADate.length; i++) {
      workstationsWithBackgroundColor.forEach(workstationWithBackgorundColor => {
        if (
          workstationWithBackgorundColor.workstation.workstationID ===
          bookingsOnADate[i].workstation.workstationID
        ) {
          workstationWithBackgorundColor.backgroundColor = "red";
          workstationWithBackgorundColor.booking = bookingsOnADate[i];
        }
      });
    }
    setWorkstationsWithBackgroundColor(workstationsWithBackgroundColor);
  };

  return (
    <div>
      <Stack justifyContent="center" alignItems="center" direction="row" sx={{ mt: 3 }} spacing={4}>
        <Box minWidth={120} maxWidth={240}>
          <FormControl fullWidth>
            <InputLabel>city</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCity}
              label="Building"
              onChange={handleSelectCityChange}>
              {
                // eslint-disable-next-line no-shadow
                cities.map(building => (
                  <MenuItem key={building.city} value={building.city}>
                    {building.city}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Box>
        <Box minWidth={120} maxWidth={240}>
          <FormControl fullWidth>
            <InputLabel>Building</InputLabel>
            <Select
              id="building"
              value={selectedBuilding}
              label="building"
              onChange={handleSelectBuildingChange}>
              {buildings.map(building => (
                <MenuItem key={building.buildingID} value={building.name}>
                  {building.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box minWidth={120} maxWidth={240}>
          <FormControl fullWidth>
            <InputLabel>floor</InputLabel>
            <Select
              id="floor"
              value={selectedFloor}
              label="floor"
              onChange={handleSelectFloorChange}>
              {floorsInABuilding.map(floor => (
                <MenuItem key={floor.floorID} value={floor.floorName}>
                  {floor.floorName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box onBlur={hanleDateBlur}>
          <DatePicker setDate={setDate} />
        </Box>
        <Button variant="contained" onClick={handleGetBookingsButtonClick}>
          Get workstations
        </Button>
      </Stack>
      <Box sx={{ flexGrow: 1, p: 5 }}>
        <Grid
          container
          spacing={2}
          sx={{
            "--Grid-borderWidth": "1px",
            borderTop: "var(--Grid-borderWidth) solid",
            borderLeft: "var(--Grid-borderWidth) solid",
            borderColor: "divider",
            "& > div": {
              borderRight: "var(--Grid-borderWidth) solid",
              borderBottom: "var(--Grid-borderWidth) solid",
              borderColor: "divider"
            }
          }}>
          {workstationsWithBackgroundColor.map(workstationWithBackgroundColor => (
            <Grid
              backgroundColor={workstationWithBackgroundColor.backgroundColor}
              key={workstationWithBackgroundColor.workstation.workstationID}
              {...{ xs: 12, sm: 6, md: 4, lg: 3 }}
              minHeight={160}>
              <Item>{workstationWithBackgroundColor.workstation.workstationID}</Item>
              <DeleteWorkstation
                workstation={workstationWithBackgroundColor.workstation}
                handleDeletedWorkstation={handleDeleteWorkstation}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
