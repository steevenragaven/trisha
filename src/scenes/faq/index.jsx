import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How do I place an order?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            To place an order, simply browse through our list of supermarkets, select the items you want to purchase, add them to your cart, and proceed to checkout. You can choose the delivery time and location that suits you best.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Can I compare prices between different supermarkets?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, our platform allows you to compare prices between different supermarkets. You can easily find the best deals and choose the store that offers the best prices for the items you need.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How do I track my order?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Once your order is placed, you can track its status in real-time through our app. You will receive updates on the preparation and delivery stages of your order.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What are the delivery charges?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Delivery charges vary based on the distance between the supermarket and your delivery location. The charges will be displayed at checkout before you confirm your order.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What if I have issues with my order?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            If you encounter any issues with your order, please contact our customer support team through the app. We are here to help resolve any problems and ensure you have a satisfactory shopping experience.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
