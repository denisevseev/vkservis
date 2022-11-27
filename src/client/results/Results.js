import React from "react";
import Search from "../../store/State";
import "./../InputWordsToSearch/InputWordsToSearch.Module.scss";
const Results = () => {
  return (
    <div className="results">
      <label className="form-check-label" htmlFor="flexCheckChecked">
        Результаты
      </label>
      <div className="border1">
        <div className="form-group">
          <div className="border1">
            <textarea
              disabled
              // ref={value}
              // onChange={() => val()}
              value={Search.inputValue}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="12"
            ></textarea>
          </div>
        </div>
      </div>
      <div style={{ display: "inline-block" }}>
        <button className="btn btn-outline-primary">Копировать</button>
        <button className="btn btn-outline-primary">Сохранить</button>
        <button className="btn btn-outline-primary">Очистить</button>
      </div>
    </div>
  );
};

export default Results;
