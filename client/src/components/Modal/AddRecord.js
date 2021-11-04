import React, { useContext } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { Context } from "../../index";
import AccessoriesTable from "./AccessoriesTable";
import FramesTable from "./FramesTable";
import GlassesTable from "./GlassesTable";
import LensesTable from "./LensesTable";
import OrdersTable from "./OrdersTable";
import ProviderTable from "./ProviderTable";
const AddRecord = ({ placeholders, show, onHide, tableName }) => {
  const { frames, providers } = useContext(Context);
  return tableName === "accessories" ? (
    <AccessoriesTable data={null} show={show} onHide={onHide} />
  ) : tableName === "providers" ? (
    <ProviderTable data={null} show={show} onHide={onHide} />
  ) : tableName === "frames" ? (
    <FramesTable data={null} show={show} onHide={onHide} />
  ) : tableName === "glasses" ? (
    <GlassesTable data={null} show={show} onHide={onHide} />
  ) : tableName === "lenses" ? (
    <LensesTable data={null} show={show} onHide={onHide} />
  ) : tableName === "orders" ? (
    <OrdersTable data={null} show={show} onHide={onHide} />
  ) : (
    ""
  );
};
export default AddRecord;
