import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Table() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setItems(data);
        }
      });
  }, []);
  return (
    <div>
      {items && items.items
        ? items.items.map((item, id) => {
            return (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div
                    style={{
                      width: "100%",
                    }}
                  >
                    <div className="header-items">
                      <div className="item">{item.productName}</div>
                      <div className="item">{item.quantity}</div>
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })
        : "There are no goods in the store"}
    </div>
  );
}
 