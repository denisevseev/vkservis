import React from "react";
import Select from "react-select";
import { Groups, Groups2 } from "../options/Options";
import Form from "react-bootstrap/Form";
import "./Filter.Module.scss";
import Search from "./../../store/State";
import { observer } from "mobx-react";
import Preloader from "../Preloader/Preloader";
import StartButton from "./StartButton";
import StopButton from "./StopButton";
const Filter = () => {
  console.log(Search.countMemTo, 'openWalls')
  return (
    <div className="filterGroup">
      Фильтрация собществ
      <div className="border1">
        <Select
          onChange={(e) => {
            Search.is_closed = e.value;
            console.log(Search.is_closed);
          }}
          placeholder="Открытые и закрытые сообщества"
          options={Groups}
        />
        <Select
          placeholder="Все типы сообществ"
          onChange={(e) => (Search.allGroups2 = e.value)}
          options={Groups2}
        />
        <Form.Check
            checked={Search.openWalls}
          onChange={(e) => Search.handleCheck("openWalls", e.target.checked)}
          label="Открытые стены"
          style={{ textAlign: "left" }}
        />
        <Form.Check
          checked={Search.openMessages}
          onChange={(e) => Search.handleCheck("openMessages", e.target.checked)}
          label="Открытые сообщения"
          style={{ textAlign: "left" }}
        />
        <Form.Check
          checked={Search.openComments}
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
                placeholder={Search.countMemFrom?Search.countMemFrom:''}
              />
            </Form.Group>
            -
            <Form.Group>
              <Form.Control
                disabled={Search.fromToMembersBoolean}
                onChange={(e) => (Search.countMemTo = e.target.value)}
                placeholder={Search.countMemTo?Search.countMemTo:''}
              />
            </Form.Group>
          </div>
          <div style={{ paddingTop: "5.3em" }} className="border1">
            <div className="d-grid gap-4 d-md-flex justify-content-md-center">
              {Search.startStop ? <StartButton /> : <StopButton />}
            </div>
          </div>
        </div>
      </div>
      <Preloader />
    </div>
  );
};

export default observer(Filter);
