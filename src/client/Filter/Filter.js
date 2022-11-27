import React from "react";
import Select from "react-select";
import options from "../options/Options";
import Form from "react-bootstrap/Form";
import "./Filter.Module.scss";
const Filter = () => {
  const options = [
    { value: "1", label: "Открытые и закрытые сообщества" },
    { value: "2", label: "Только открытые сообщества" },
    { value: "3", label: "Только закрытые группы" },
  ];
  const options2 = [
    { value: "4", label: "Только группы" },
    { value: "5", label: "Только публичные страницы" },
    { value: "6", label: "Только мероприятия (встречи)" },
  ];
  return (
    <div style={{ width: "40em" }}>
      Фильтрация сообществ
      <div className="border1">
        <Select placeholder="все типы сообществ" options={options2} />
        <Select
          placeholder="открытые и закрытые сообщества"
          options={options}
        />
        <Form.Check label="Открытые стены" style={{ textAlign: "left" }} />
        <Form.Check label="Открытые сообщения" style={{ textAlign: "left" }} />
        <Form.Check
          label="Открытые комментарии"
          style={{ textAlign: "left" }}
        />
        <div className="border1">
          <Form.Check
            label="Количество участников"
            style={{ textAlign: "left" }}
          />
          <div style={{ display: "flex" }}>
            <Form.Group>
              <Form.Control placeholder="500" />
            </Form.Group>
            -
            <Form.Group>
              <Form.Control placeholder="1000" />
            </Form.Group>
          </div>
          <div style={{ paddingTop: "5.3em" }} className="border1">
            <button className="btn btn-outline-primary">старт</button>
            <button className="btn btn-outline-primary">стоп</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
