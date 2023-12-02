import React from "react";
import { NavLink } from "react-router-dom";

const BuyAccounts = () => {
  return (
    <div>
      <NavLink to="/">
        {" "}
        <div style={{ textAlign: "left" }}>Назад</div>
      </NavLink>
      <table className="table">
        <tbody>
          <tr>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
            <td>
              <button>Купить</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BuyAccounts;
