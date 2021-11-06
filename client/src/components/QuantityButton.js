import { Button, Container, Row } from "react-bootstrap";

const QuantityButton = ({ value, setValue, access }) => {
  return (
    // <Row>
    <Container
      className="mb-5"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        disabled={!access}
        size="lg"
        onClick={() => setValue(value === 0 ? 0 : --value)}
      >
        &minus;
      </Button>

      <h3 className="text-center m-3">{value}</h3>
      <Button disabled={!access} size="lg" onClick={() => setValue(++value)}>
        +
      </Button>
    </Container>
    // </Row>
  );
};

export default QuantityButton;
