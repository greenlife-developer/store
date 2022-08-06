import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Table() {
  const [items, setItems] = useState(null);
  const [keyword, setKeyword] = useState("")

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.items) {
          setItems(data.items);
        }
      });
  }, []);

  // const result = styles.filter((std) => {
  //   return std.name === style;
  // });

  const handleChange = (e) => {
    console.log(e.target.value)
    setKeyword(e.target.value)
  }

  let newItems = null;

  if (items) {
    const newItems1 = items.filter((nItem) => {
      return nItem.productName === keyword;
    });
    newItems = newItems1;
  }

  console.log(newItems);

  return (
    <div>
      <h1>All goods in shop</h1>
      <div className="store">
        <input
          type="text"
          name="query"
          placeholder="Enter a keyword"
          onChange={handleChange}
        />
        <div className="right">
          <Link to="/api/new-product" className="btn btn-primary">
            Add product
          </Link>
        </div>
        <div className="sales">
          {items
            ? newItems.map((item, id) => {
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
      </div>
    </div>
  );
}
