import { observer } from "mobx-react-lite";
import { Card } from "react-bootstrap";

const FilterTypeProduct = observer(({ product }) => {
  return (
    <Card className="p-2">
      <h4 className="m-auto pt-2 pb-2">Show products</h4>
      <ul class="list-group">
        <li class="list-group-item">
          <input
            class="form-check-input me-1"
            type="checkbox"
            value=""
            aria-label="..."
            checked={product.selectedProducts.includes("glasses")}
            onChange={(e) => {
              e.target.checked
                ? product.addSelectedProducts("glasses")
                : product.removeSelectedProducts("glasses");
            }}
          />
          Glasses
        </li>
        <li class="list-group-item">
          <input
            class="form-check-input me-1"
            type="checkbox"
            value=""
            aria-label="..."
            checked={product.selectedProducts.includes("lenses")}
            onChange={(e) => {
              e.target.checked
                ? product.addSelectedProducts("lenses")
                : product.removeSelectedProducts("lenses");
            }}
          />
          Lenses
        </li>
        <li class="list-group-item">
          <input
            class="form-check-input me-1"
            type="checkbox"
            value=""
            aria-label="..."
            checked={product.selectedProducts.includes("accessories")}
            onChange={(e) => {
              e.target.checked
                ? product.addSelectedProducts("accessories")
                : product.removeSelectedProducts("accessories");
            }}
          />
          Accessories
        </li>
      </ul>
    </Card>
  );
});
export default FilterTypeProduct;
