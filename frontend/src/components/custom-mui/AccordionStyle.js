import MuiAccordion from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";

// eslint-disable-next-line react/jsx-props-no-spreading
export default styled(props => <MuiAccordion disableGutters elevation={0} square {...props} />)(
  ({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`
  })
);
