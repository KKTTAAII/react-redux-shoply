import React from "react";
import { useState } from "react";
import "../css/Discount.css";

const Discount = ({ discountFormula, total }) => {
  const [submit, setSubmit] = useState(false);
  const [click, setClick] = useState(false);
  const [percentageDiscount, setPercentageDiscount] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const discounts = [10, 20, 30];
  const getRandomDiscount = () => {
    const length = discounts.length;
    const percent = discounts[Math.floor(Math.random() * length)];
    setPercentageDiscount(percent);
    setDiscountCode("REMOVE"+percent)
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (submit) {
      return;
    } else {
      setSubmit(true);
      discountFormula(total, percentageDiscount);
    }
  };
  const handleClick = e => {
    if (click) {
      return;
    } else {
      setClick(true);
      getRandomDiscount();
      const discountCardContainer = document.querySelector(
        ".Discount-flip-card-container"
      );
      discountCardContainer.classList.add("rotate");
    }
  };

  return (
    <div>
      <div className="Discount-flip-card-container" onClick={handleClick}>
        <div className="Discount-flip-card-inner">
          <div className="Discount-flip-card-front">Click for a DISCOUNT!</div>
          <div className="Discount-flip-card-back">
            REMOVE{percentageDiscount}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <small>Offer Code</small>
        <input type="text" readOnly value={discountCode}></input>
        <button>APPLY</button>
      </form>
    </div>
  );
};

export default Discount;
