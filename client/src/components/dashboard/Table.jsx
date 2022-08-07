import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Table() {
  const [items, setItems] = useState(null);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.items);
        if (data.items) {
          setItems(data.items);
        }
      });
  }, []);

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

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
            ? items
                .filter((item) => {
                  if (keyword === "") {
                    return item;
                  } else if (
                    item.productName.toLowerCase().includes(keyword.toLowerCase())
                  ) {
                    return item;
                  }
                })
                .map((item, id) => {
                  return (
                    <Accordion key={id}>
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
                        <div className="accordion">
                          <h3>{item.productName}</h3>
                          <div className="">
                            <label htmlFor="quantity">Quantity:</label>
                            <span>{item.quantity}</span>
                          </div>
                          <div className="">
                            <label htmlFor="price">Price:</label>
                            <span>{item.price}</span>
                          </div>
                          <div className="">
                            <label htmlFor="total">Total:</label>
                            <span>{item.total}</span>
                          </div>
                          <a className="btn btn-primary"><Link to="">Edit</Link></a>
                          <a className="btn btn-secondary">Sell</a>
                        </div>
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
