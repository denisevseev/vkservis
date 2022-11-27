import { observer } from "mobx-react-lite";
import React, { useRef, useState } from "react";
import Search from "../../store/State";
import "./InputWordsToSearch.Module.scss";
import Select from "react-select";
import { City, Country } from "./../options/Options";

const InputWordsToSearch = () => {
  const [value1, setValue] = useState(null);
  const value = useRef();
  const val = () => {
    Search.changeInput(value.current.value);
  };

  return (
    <div style={{ width: "40em" }}>
      <label htmlFor="exampleFormControlTextarea1">поисковые запросы</label>
      <div style={{ textAlign: "left" }} className="border1">
        <div className="form-group">
          <div className="border1">
            <textarea
              ref={value}
              onChange={() => val()}
              value={Search.inputValue}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckChecked"
                defaultChecked={Search.reqMustTitle}
                onChange={(e) =>
                  Search.handleCheck("reqMustTitle", e.target.checked)
                }
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                запрос обязан быть в названии
              </label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="border1">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckChecked"
                defaultChecked={false}
                onChange={(e) =>
                  Search.handleCheck("exclude", e.target.checked)
                }
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                исключить сообщества со словами
              </label>
            </div>
            <textarea
              disabled={Search.disabled}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
        </div>

        <div className="form-group">
          <div className="border1">
            <label htmlFor="exampleFormControlTextarea1">регион:</label>
            <div
              style={{
                textAlign: "center",
                padding: "-1em",
                justifyContent: "space-between",
                width: "100%",
                display: "flex",
              }}
            >
              <div style={{ width: "50%" }}>
                <Select placeholder="Любая страна" options={Country} />
              </div>
              <div style={{ width: "50%" }}>
                <Select placeholder="Любой город" options={City} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(InputWordsToSearch);
