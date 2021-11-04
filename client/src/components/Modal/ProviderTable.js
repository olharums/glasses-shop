import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createProviders, editProviders } from "../../http/providersAPI";

const ProviderTable = observer(({ edit, show, onHide, data }) => {
  const id = data ? data.id : null;

  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(true);

  const [country, setCountry] = useState("");
  const [countryValid, setCountryValid] = useState(true);

  const [head, setHead] = useState("");
  const [headValid, setHeadValid] = useState(true);

  const [passport, setPassport] = useState("");
  const [passportValid, setPassportValid] = useState(true);

  const [tax_number, setTaxNumber] = useState("");
  const [tax_numberValid, setTaxNumberValid] = useState(true);

  const [phone_number, setPhoneNumber] = useState("");
  const [phone_numberValid, setPhoneNumberValid] = useState(true);

  const dataFormation = () => {
    const formData = new FormData();
    formData.append("name", name ? name : data.name);
    formData.append("country", country ? country : data.country);
    formData.append("head", head ? head : data.head);
    formData.append("passport", passport ? passport : data.passport);
    formData.append("tax_number", tax_number ? tax_number : data.tax_number);
    formData.append(
      "phone_number",
      phone_number ? phone_number : data.phone_number
    );
    return formData;
  };

  const checkEmpty = () => {
    setNameValid(true);
    setCountryValid(true);
    setHeadValid(true);
    setPassportValid(true);
    setTaxNumberValid(true);
    setPhoneNumberValid(true);

    if (!name) {
      setNameValid(false);
      return false;
    }
    if (!country) {
      setCountryValid(false);
      return false;
    }
    if (!head) {
      setHeadValid(false);
      return false;
    }
    if (!passport) {
      setPassportValid(false);
      return false;
    }

    if (!tax_number) {
      setTaxNumberValid(false);
      return false;
    }
    if (!phone_number) {
      setPhoneNumberValid(false);
      return false;
    }
    return true;
  };

  const clearing = () => {
    setName("");
    setCountry("");
    setHead("");
    setPassport("");
    setTaxNumber("");
    setPhoneNumber("");
  };

  const addRecord = () => {
    if (checkEmpty()) {
      const formData = dataFormation();
      createProviders(formData).then((data) => {
        clearing();
        onHide();
      });
    }
  };

  const editRecord = () => {
    const formData = dataFormation();
    formData.append("id", id);
    editProviders(formData).then((data) => {
      clearing();
      onHide();
    });
  };
  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header>
        <Modal.Title>{edit ? "Изменить" : "Добавить"} запись</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="d-flex flex-column text-center">
          <Form.Control
            className={"mb-3" + (nameValid ? "" : " is-invalid")}
            placeholder={"Название"}
            onChange={(e) => setName(e.target.value)}
            value={name}
            defaultValue={data && data.name ? data.name : name}
          />
          <Form.Control
            className={"mb-3" + (countryValid ? "" : " is-invalid")}
            placeholder={data && data.country ? data.country : "Страна"}
            onChange={(e) => setCountry(e.target.value)}
            value={country}
          />
          <Form.Control
            className={"mb-3" + (headValid ? "" : " is-invalid")}
            placeholder={data && data.head ? data.head : "Директор"}
            onChange={(e) => setHead(e.target.value)}
            value={head}
          />
          <Form.Control
            className={"mb-3" + (passportValid ? "" : " is-invalid")}
            placeholder={data && data.passport ? data.passport : "Паспорт"}
            onChange={(e) => setPassport(e.target.value)}
            value={passport}
          />
          <Form.Control
            className={"mb-3" + (tax_numberValid ? "" : " is-invalid")}
            placeholder={
              data && data.tax_number ? data.tax_number : "Налоговый номер"
            }
            onChange={(e) => setTaxNumber(e.target.value)}
            value={tax_number}
          />
          <Form.Control
            className={"mb-3" + (phone_numberValid ? "" : " is-invalid")}
            placeholder={
              data && data.phone_number ? data.phone_number : "Номер телефона"
            }
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phone_number}
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
export default ProviderTable;
