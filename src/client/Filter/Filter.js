import React from "react";
import Select from "react-select";
import { Groups, Groups2 } from "../options/Options";
import Form from "react-bootstrap/Form";
import "./Filter.Module.scss";
import Search from "./../../store/State";
import { observer } from "mobx-react";
import Preloader from "../Preloader/Preloader";
const Filter = () => {

  return (
    <div className='filterGroup'>
      Фильтрация собществ
      <div className="border1">
        <Select
          onChange={(e) => {
            Search.is_closed = e.value;
            console.log(Search.is_closed);
          }}
          placeholder={Search.is_closed.label}
          options={Groups}
        />
        <Select
          placeholder={Search.allGroups2.label}
          onChange={(e) => (Search.allGroups2 = e.value)}
          options={Groups2}
        />
        <Form.Check
          defaultChecked={Search.openWalls}
          onChange={(e) => Search.handleCheck("openWalls", e.target.checked)}
          label="Открытые стены"
          style={{ textAlign: "left" }}
        />
        <Form.Check
          defaultChecked={Search.openMessages}
          onChange={(e) => Search.handleCheck("openMessages", e.target.checked)}
          label="Открытые сообщения"
          style={{ textAlign: "left" }}
        />
        <Form.Check
          defaultChecked={Search.openComments}
          onChange={(e) => Search.handleCheck("openComments", e.target.checked)}
          label="Открытые комментарии"
          style={{ textAlign: "left" }}
        />
        <div className="border1">
          <Form.Check
            defaultChecked={Search.countMembers}
            onChange={(e) =>
              Search.handleCheck("countMembers", e.target.checked)
            }
            label="Количество участников"
            style={{ textAlign: "left" }}
          />
          <div style={{ display: "flex" }}>
            <Form.Group>
              <Form.Control
                disabled={Search.fromToMembersBoolean}
                onChange={(e) => (Search.countMemFrom = e.target.value)}
                placeholder="500"
              />
            </Form.Group>
            -
            <Form.Group>
              <Form.Control
                disabled={Search.fromToMembersBoolean}
                onChange={(e) => (Search.countMemTo = e.target.value)}
                placeholder="1000"
              />
            </Form.Group>
          </div>
          <div style={{ paddingTop: "5.3em" }} className="border1">
            <div className="d-grid gap-4 d-md-flex justify-content-md-center">
              <button className="btn btn-outline-primary" onClick={Search.startSearch} type="button">Старт</button>
              <button className="btn btn-outline-primary" type="button">Стоп</button>
            </div>
          </div>
        </div>
      </div>
      <Preloader />
    </div>
  );
};

export default observer(Filter);
