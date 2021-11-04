import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { Context } from "../index";
import FilterTemplate from "./FilterTemplate";
import FilterTypeProduct from "./FilterTypeProduct";
// import { RangeSlider } from "react-range-slider";
const FilterBar = observer(() => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const theLowestPrice = 0;
  const theHighestPrice = 100;
  const { frames, colors, purposes, product } = useContext(Context);
  return (
    <div>
      <FilterTypeProduct product={product} />
      <Card className="mt-4 p-2">
        <h5 className="m-auto">Цена</h5>
        <h5 className="m-auto mt-2">
          {minPrice}-{maxPrice}
        </h5>
        <Card className="mt-2 p-2">
          <label for="customRange1" class="form-label">
            От
          </label>
          <input
            type="range"
            class="form-range"
            min={theLowestPrice}
            max={theHighestPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            id="customRange1"
          />
          <label for="customRange2" class="form-label">
            До
          </label>
          <input
            type="range"
            class="form-range"
            min={minPrice}
            max={theHighestPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            id="customRange2"
          />
        </Card>
      </Card>
      <FilterTemplate store={purposes} title={"Предназначение"} />
      <FilterTemplate store={frames} title={"Виды оправ"} />
      <FilterTemplate store={colors} title={"Цвета оправ"} />
    </div>
  );
});
export default FilterBar;
