import React from "react";
import Select from "react-select";
import { Groups, Groups2 } from "../options/Options";
import Form from "react-bootstrap/Form";
import "./Filter.Module.scss";
import Search from "./../../store/State";
import { observer } from "mobx-react";
const Filter = () => {
  let time = () => {
    // let fr  = Search.allGroups
    // setTimeout(()=>{
    //   console.log(Search.allGroups)
    // },3000)
  };
  return (
    <div style={{ width: "40em" }}>
      Фильтрация сообществ
      <div className="border1">
        <Select
          onChange={(e) => {
            Search.allGroups = e.value;
            time();
          }}
          placeholder={Search.allGroups}
          options={Groups}
        />
        <Select
          placeholder={Search.allGroups2}
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
            <button
              onClick={Search.startSearch}
              className="btn btn-outline-primary"
            >
              старт
            </button>
            <button className="btn btn-outline-primary">стоп</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Filter);
