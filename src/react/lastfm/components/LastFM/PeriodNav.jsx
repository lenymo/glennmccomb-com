//
//  PERIOD NAV
//––––––––––––––––––––––––––––––––––––––––––––––––––

import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  requestData: PropTypes.func.isRequired,
  period: PropTypes.string.isRequired,
};

export const PeriodNav = ({ requestData, period }) => {
  const renderPeriodNav = () => {
    const periodNavItems = [
      {
        name: "All-time",
        period: "overall",
      },
      {
        name: "Last year",
        period: "12month",
      },
      {
        name: "Last 3 months",
        period: "3month",
      },
      {
        name: "Last week",
        period: "7day",
      },
    ];

    const periodNav = periodNavItems.map((periodNavItem) => (
      <li
        key={periodNavItem.period}
        className={
          "last-fm-period__list-item" +
          (periodNavItem.period === period ? " -is-current" : "")
        }
      >
        <a
          className="last-fm-period__link"
          onClick={() => requestData(periodNavItem.period)}
        >
          {periodNavItem.name}
        </a>
      </li>
    ));

    return periodNav;
  };

  return (
    <div className="col-sm-12 col__last-fm-period">
      <nav className="last-fm-period">
        <ul className="last-fm-period__list">{renderPeriodNav()}</ul>
      </nav>
    </div>
  );
};

PeriodNav.propTypes = propTypes;
