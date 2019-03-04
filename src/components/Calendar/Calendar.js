import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import ic_back from './ic_back.svg';
import ic_forward from './ic_forward.svg';

const config = {
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    month_subs: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    weeks: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    week_subs: ['日', '一', '二', '三', '四', '五', '六'],
    today: function() {
      return new Date();
    }
}
const TODAY = config.today();

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: config.today(),
      selectedDay: config.today(),
      ldom: 30
    };
  }

  componentWillMount() {
    this.updateMonth(0);
  }

  updateMonth(add) {
    var d = this.state.current;
    d.setMonth(d.getMonth() + add);
    var eom = new Date(d.getYear(), d.getMonth() + 1, 0).getDate();
    this.setState({
      current: d,
      ldom: eom
    });
  }

  prev() {
    this.updateMonth(-1);
  }

  next() {
    this.updateMonth(1);
  }

  _onDatePicked(month, day) {
    var d = new Date(this.state.current.getTime());
    d.setMonth(d.getMonth() + month);
    d.setDate(day);
    this.props.onDatePicked(d);
    this.setState({
      selectedDay: d
    });
  }

  renderDay(opts={}) {
    var baseClasses = "day noselect";
    var today = "";
    var todayStyle = {};
    var containerStyle = {};
    if( opts.today ) {
      today = "current";
      todayStyle = {
        borderColor: this.props.accentColor2,
      };
    }

    var selected = "";
    var selectedStyle = {};
    if( opts.selected ) {
      selected = "selected";
      selectedStyle = {
        backgroundColor: this.props.accentColor
      }
      containerStyle = {
        color: '#ffffff'
      }
    }
    else if (opts.selectedDay) {
      selected = "selected";
      selectedStyle = {
        backgroundColor: this.props.accentColor2
      }
      containerStyle = {
        color: '#ffffff'
      }
    }

    baseClasses += opts.current ? "" : " non-current";

    return (<div className={baseClasses}
                style={containerStyle}>
              <div className={today} style={todayStyle}></div>
              <div className={selected} style={selectedStyle}></div>
              <p onClick={ (ev) => {
                var day = ev.target.innerHTML;
                this._onDatePicked(opts.month, day);
              }}>{opts.date.getDate()}</p>
            </div>);
  }

  renderDays(copy) {
    var days = [];

    // set to beginning of month
    copy.setDate(1);

    // if we are missing no offset, include the previous week
    var offset = copy.getDay() === 0 ? 7 : copy.getDay();

    copy.setDate(-offset);

    var inMonth = false;
    var lastMonth = true;
    for (var i = 0; i < 42; i++) {
      // increase date
      copy.setDate(copy.getDate() + 1);

      // make sure we pass any previous month values
      if (i < 30 && copy.getDate() === 1) {
        inMonth = true;
        lastMonth = false;
      }
      // if we are seeing the '1' again, we have iterated over
      // the current month
      else if (i > 30 && copy.getDate() === 1) {
        inMonth = false;
      }
      var selDay = new Date(this.state.selectedDay.getTime());
      var isSelectedDay = (selDay.getFullYear() === copy.getFullYear() &&
          selDay.getDate() === copy.getDate() &&
          selDay.getMonth() === copy.getMonth());

      var sel = this.props.selected;
      var copyDate = copy.toLocaleDateString([],{year:"numeric", month:"2-digit", day:"2-digit"}).replace(/\//g,'-');
      var isSelected = sel.includes(copyDate);

      var isToday = (TODAY.getFullYear() === copy.getFullYear() &&
          TODAY.getDate() === copy.getDate() &&
          TODAY.getMonth() === copy.getMonth());

      days.push(this.renderDay({
        today: isToday,
        selected: isSelected,
        selectedDay: isSelectedDay,
        current: inMonth,
        month: (inMonth ? 0 : (lastMonth ? -1 : 1)),
        date: copy
      }));
    }

    return days;
  }

  renderHeaders() {
    var header = [];

    for (var i = 0; i < config.week_subs.length; i++) {
      header.push(<p className='day-headers noselect'>
                    {config.week_subs[i]}
                  </p>);
    }

    return header;
  }

  render() {
    // get su-sat header
    var header = this.renderHeaders();

    // copy our current time state
    var copy = new Date(this.state.current.getTime());

    // get the month days
    var days = this.renderDays(copy);

    var tMonth = config.months[this.state.selectedDay.getMonth()];
    var tDate = this.state.selectedDay.getDate();
    var month = config.months[this.state.current.getMonth()];
    var year = this.state.current.getFullYear();

    var upperDate = null;
    if( this.props.showHeader ) {
      upperDate = (<div className='flex-2 header center' style={{
          backgroundColor: this.props.accentColor
        }}>
        <p className="header-month">{tMonth.toUpperCase()}</p>
        <p className="header-day">{tDate}</p>
      </div>);
    }
    return (<div className={this.props.orientation}>
      {upperDate}
      <div className="padding">
        <div className='month'>
          <img className="month-arrow-left" src={ic_back} alt="back" onClick={this.prev.bind(this)}></img>
          <p className="month-title">{month}<br/>
          <span className="month-year">{year}</span>
          </p>
          <img className="month-arrow-right" src={ic_forward} alt="forward" onClick={this.next.bind(this)}></img>
        </div>
        <div className='footer'>
          {header}
          {days}
        </div>
      </div>
    </div>);
  }

};

Calendar.propTypes = {
  accentColor: PropTypes.string,
  accentColor2: PropTypes.string,
  onDatePicked: PropTypes.func,
  showHeader: PropTypes.bool,
  orientation: PropTypes.string,
  selected: PropTypes.array,
};

Calendar.defaultProps = {
  accentColor: '#00C1A6',
  accentColor2: '#f48fb1',
  onDatePicked: function(){},
  showHeader: true,
  orientation: 'flex-col',
  selected: [],
};

export default Calendar;
