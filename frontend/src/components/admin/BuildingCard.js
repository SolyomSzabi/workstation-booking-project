import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import EditBuilding from "./EditBuilding";
import DeleteBuilding from "./DeleteBuilding";

export default function BuildingCard({
  building,
  index,
  handleDeleteBuilding,
  handleEditBuilding
}) {
  const handleTheDeletedBuilding = buildingToDelete => {
    handleDeleteBuilding(buildingToDelete);
  };

  const handleTheEditedBuilding = (buildingToEdit, buildingIndex) => {
    handleEditBuilding(buildingToEdit, buildingIndex);
  };

  return (
    <div>
      <Card sx={{ m: 3, maxWidth: 300, borderRadius: 1 }} key={building.buildingID}>
        <CardContent>
          <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
            {building.name}
          </Typography>
          <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
            {building.postal_code}
          </Typography>
          <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
            {building.address}
          </Typography>
        </CardContent>
        <Stack direction="column">
          <EditBuilding
            building={building}
            index={index}
            handleTheEditedBuilding={handleTheEditedBuilding}
          />
          <DeleteBuilding building={building} handleTheDeletedBuilding={handleTheDeletedBuilding} />
          <Button
            href="/admin/bookings"
            variant="outlined"
            sx={{ my: 1 }}>
            Edit Bookings
          </Button>
          <Button
            href={`/admin/buildings/${building.buildingID}/floors`}
            variant="outlined"
          >Edit Floors</Button>
        </Stack>
      </Card>
    </div>
  );
}
