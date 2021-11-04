import { Card } from "react-bootstrap";
import { observer } from "mobx-react-lite";

const FilterTemplate = observer(({ store, title }) => {
  return (
    <Card className="mt-4 p-2">
      <h5 className="m-auto mb-2">{title}</h5>
      <ul class="list-group">
        {store.types.map((elem) => {
          //   console.log(elem);
          return (
            <li class="list-group-item" key={elem.id}>
              <input
                class="form-check-input me-1"
                type="checkbox"
                value=""
                aria-label="..."
                checked={store.selectedTypes.includes(elem.id)}
                onChange={(e) => {
                  // console.log(e.target.checked);
                  e.target.checked
                    ? store.addSelectedType(elem.id)
                    : store.removeSelectedType(elem.id);
                }}
              />
              {elem.name}
            </li>
          );
        })}
      </ul>
    </Card>
  );
});
export default FilterTemplate;
