

//
//  PERIOD NAV
//––––––––––––––––––––––––––––––––––––––––––––––––––

import React from 'react';
import PropTypes from 'prop-types';

class PeriodNav extends React.Component {
  constructor() {
    super();

    this.renderPeriodNav = this.renderPeriodNav.bind(this);
  }

  renderPeriodNav() {
    const periodNavItems = [
      {
        name: 'All-time',
        period: 'overall'
      }, {
        name: 'Last year',
        period: '12month'
      }, {
        name: 'Last 3 months',
        period: '3month'
      }, {
        name: 'Last week',
        period: '7day'
      }
    ];

    const periodNav = periodNavItems.map((periodNavItem) =>
      <li key={periodNavItem.period} className={'last-fm-period__list-item' + (periodNavItem.period === this.props.period ? ' -is-current' : '')}>
        <a href="javascript:void(0);" className="last-fm-period__link" onClick={() => this.props.lambdaFunction( periodNavItem.period )}>
          {periodNavItem.name}
        </a>
      </li>
    );

    return periodNav;

    // const periodNav = [];

    // for (var i = 0; i < periodNavItems.length; i++) {
      
    //   const name = periodNavItems[i].name;
    //   const period = periodNavItems[i].period;

    //   let activeClass = '';

    //   if ( period == this.props.period ) {
    //     activeClass = '-is-current';
    //   }

    //   periodNav.push(
    //     <li key={period} className={'last-fm-period__list-item ' + activeClass}>
    //       <a href="javascript:void(0);" className="last-fm-period__link" onClick={() => this.props.requestData( period )}>
    //         {name}
    //       </a>
    //     </li>
    //   );
    // }

    // return periodNav;
  }

  render() {
    return(
      <div className="col-sm-12 col__last-fm-period">
        <nav className="last-fm-period">
          <ul className="last-fm-period__list">
          
            {this.renderPeriodNav()}

          </ul>
        </nav>
      </div>
    )
  }
}

PeriodNav.propTypes = {
  requestData: PropTypes.func.isRequired,
  period: PropTypes.string.isRequired
}

export default PeriodNav;