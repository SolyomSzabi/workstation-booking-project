import { useState, useEffect } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { getBuildings } from "../../services/BuildingService";
import AddNewBuilding from "./AddNewBuilding";
import BuildingCard from "./BuildingCard";

export default function SelectBuilding() {
  const [regions, setRegions] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    getBuildings().then(queryData => {
      setRegions(queryData.data);
      setBuildings(queryData.data[0].buildings);
      setSelectedCity(queryData.data[0].city);
    });
  }, []);

  const handleSelectCityChange = event => {
    setSelectedCity(event.target.value);

    const selectCity = ({ city }) => city === event.target.value;
    setBuildings(regions[regions.findIndex(selectCity)].buildings);
  };

  const handleAddBuilding = newBuilding => {
    const { city } = newBuilding;

    if (!regions.find(region => region.city === city)) {
      setRegions([...regions, { city, buildings: [newBuilding] }]);
      setBuildings([newBuilding]);
    } else {
      setBuildings([...regions[regions.findIndex(region => region.city === city)].buildings, newBuilding]);
    }

    setSelectedCity(city);
  };

  const handleEditBuilding = (editBuilding, index) => {
    const updatedBuildings = [...buildings];
    updatedBuildings[index] = editBuilding;
    setBuildings(updatedBuildings);
  };

  const handleDeleteBuilding = deleteBuilding => {
    const { city } = deleteBuilding;
    const updatedBuildings = buildings.filter(building => building.buildingID !== deleteBuilding.buildingID);
    const regionIndex = regions.findIndex(region => region.city === city);
    const regionToUpdate = regions[regionIndex];
    regionToUpdate.buildings = updatedBuildings;

    if (updatedBuildings.length === 0) {
      const deleteFromRegion = [...regions];
      deleteFromRegion.splice(regionIndex, 1);
      if (deleteFromRegion.length !== 0) {
        setSelectedCity(deleteFromRegion[0].city);
        setBuildings(deleteFromRegion[0].buildings);
      } else {
        setBuildings([]);
      }
    } else {
      const updatedRegions = regions.map((region, index) => {
        if (index === regionIndex) {
          return regionToUpdate;
        }
        return region;
      });
      setRegions(updatedRegions);
      setBuildings(updatedBuildings);
    }
  };

  return (
    <div>
      <Stack justifyContent="center" alignItems="center" direction="row" sx={{ mt: 3 }} spacing={4}>
        <Typography variant="h6" sx={{ p: 1 }}>
          { regions.length === 0 ? (<div>Create a new Building</div>): (<div>Select another city</div>)}
        </Typography>
        { regions.length !== 0 ? (
        <Stack>
          <Box minWidth={120} maxWidth={240}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">City</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCity}
                label="Building"
                onChange={handleSelectCityChange}>
                {
                  // eslint-disable-next-line no-shadow
                  regions.map(building => (
                    <MenuItem key={building.city} value={building.city}>
                      {building.city}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Box>
        </Stack>) : (<div> </div>)
        }
        <AddNewBuilding handleAddBuilding={handleAddBuilding} />
      </Stack>
      <Stack direction="row" justifyContent="center" alignItems="center">
        {
          // eslint-disable-next-line no-shadow
          buildings.map((building, index) => (
            <BuildingCard
              key={building.buildingID}
              building={building}
              index={index}
              handleDeleteBuilding={handleDeleteBuilding}
              handleEditBuilding={handleEditBuilding}
            />
          ))
        }
      </Stack>
    </div>
  );
}
