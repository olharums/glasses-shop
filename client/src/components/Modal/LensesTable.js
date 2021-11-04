import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { fetchProviders } from "../../http/providersAPI";

import {
  createAccessories,
  createLenses,
  editLenses,
} from "../../http/productsAPI";
import { Context } from "../../index";

const LensesTable = observer(({ edit, show, onHide, data }) => {
  const { providers } = useContext(Context);

  const id = data ? data.id : null;

  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(true);

  const [material, setMaterial] = useState("");
  const [materialValid, setMaterialValid] = useState(true);

  const [country, setCountry] = useState("");
  const [countryValid, setCountryValid] = useState(true);

  const [price, setPrice] = useState("");
  const [priceValid, setPriceValid] = useState(true);

  const [purpose, setPurpose] = useState("");
  const [purposeValid, setPurposeValid] = useState(true);

  const [quantity, setQuantity] = useState("");
  const [quantityValid, setQuantityValid] = useState(true);

  const [providerValid, setProviderValid] = useState(true);

  const [image, setImage] = useState("");

  const dataFormation = () => {
    const formData = new FormData();
    formData.append("name", name ? name : data.name);
    formData.append("material", material ? material : data.material);
    formData.append("purpose", purpose ? purpose : data.purpose);
    formData.append("quantity", quantity ? quantity : data.quantity);
    formData.append("manufacturer", country ? country : data.manufacturer);
    formData.append(
      "providerId",
      providers.selectedProvider
        ? providers.selectedProvider.id
        : data.providerId
    );
    formData.append("price", price ? price : data.price);
    return formData;
  };

  const checkEmpty = () => {
    setNameValid(true);
    setQuantityValid(true);
    setMaterialValid(true);
    setPurposeValid(true);
    setPriceValid(true);
    setCountryValid(true);
    setProviderValid(true);

    if (!name) {
      setNameValid(false);
      return false;
    }
    if (!material) {
      setMaterialValid(false);
      return false;
    }
    if (!country) {
      setCountryValid(false);
      return false;
    }
    if (!purpose) {
      setPurposeValid(false);
      return false;
    }
    if (!price) {
      setPriceValid(false);
      return false;
    }
    if (!quantity) {
      setQuantityValid(false);
      return false;
    }
    if (!providers.selectedProvider) {
      setProviderValid(false);
      return false;
    }
    return true;
  };

  const clearing = () => {
    setName("");
    setMaterial("");
    setCountry("");
    setPrice("");
    setImage("");
    setPurpose("");
    setQuantity("");
    providers.setSelectedProvider("");
  };

  const addRecord = () => {
    if (checkEmpty()) {
      const formData = dataFormation();
      formData.append("img", image);
      createLenses(formData).then((data) => {
        clearing();
        onHide();
      });
    }
  };

  const editRecord = () => {
    const formData = dataFormation();
    formData.append("id", id);
    editLenses(formData).then((data) => {
      clearing();
      onHide();
    });
  };

  useEffect(() => {
    fetchProviders().then((data) => providers.setTypes(data));
  }, []);
  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header>
        <Modal.Title>{edit ? "Изменить" : "Добавить"} запись</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="d-flex flex-column text-center">
          <Form.Control
            className={"mb-3" + (nameValid ? "" : " is-invalid")}
            placeholder={data && data.name ? data.name : "Название"}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Form.Control
            className={"mb-3" + (materialValid ? "" : " is-invalid")}
            placeholder={data && data.material ? data.material : "Материал"}
            onChange={(e) => setMaterial(e.target.value)}
            value={material}
          />
          <Form.Control
            className={"mb-3" + (countryValid ? "" : " is-invalid")}
            placeholder={
              data && data.manufacturer
                ? data.manufacturer
                : "Страна-производитель"
            }
            onChange={(e) => setCountry(e.target.value)}
            value={country}
          />
          <Form.Control
            className={"mb-3" + (purposeValid ? "" : " is-invalid")}
            placeholder={data && data.purpose ? data.purpose : "Предназначение"}
            onChange={(e) => setPurpose(e.target.value)}
            value={purpose}
          />
          <Form.Control
            className={"mb-3" + (priceValid ? "" : " is-invalid")}
            placeholder={data && data.price ? data.price : "Цена"}
            onChange={(e) => setPrice(Number(e.target.value))}
            value={price}
          />
          <Form.Control
            className={"mb-3" + (quantityValid ? "" : " is-invalid")}
            placeholder={data && data.quantity ? data.quantity : "Количество"}
            onChange={(e) => setQuantity(Number(e.target.value))}
            value={quantity}
          />
          <Dropdown className="mb-3">
            <Dropdown.Toggle variant={providerValid ? "primary" : "danger"}>
              {providers.selectedProvider.name ||
                (data
                  ? providers.getProviderById(data.providerId)
                  : "Выберите поставщика")}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {providers.types.map((provider) => (
                <Dropdown.Item
                  key={provider.name}
                  onClick={(e) => providers.setSelectedProvider(provider)}
                >
                  {provider.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            hidden={edit}
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => {
            onHide();
            clearing();
          }}
        >
          Закрыть
        </Button>
        <Button
          onClick={edit ? editRecord : addRecord}
          variant={edit ? "warning" : "success"}
        >
          {edit ? "Изменить" : "Добавить"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
});
export default LensesTable;
