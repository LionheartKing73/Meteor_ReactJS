import React, { Component, PropTypes } from 'react';
import { PieChart, Pie, Legend, Tooltip } from 'recharts';
import { Chart } from 'chart.js';

class GroupCircle extends Component {
  constructor(props) {
    super(props);

    this.state = {
    	chart: false
		}
  }

  componentDidMount() {
		this._initializeChart();
	}

	componentWillUnmount() {
		const { chart } = this.state;
		if(chart)
			chart.destroy();
	}

  _handleClick(group) {
		// Check Total > 0 before join group
    if (this.props.total > 0) {
    	this.props.handleClick(group);
    }
  }

  _initializeChart() {
  	const { group } = this.props;
		const doughnutOptions = {
			type: 'doughnut',
			data: {
				labels: ['IPP', 'Potêncial'],
				datasets: [{
					backgroundColor: [
						"#33aa78",
						"#f89403"
					],
					data: [24, 7],
					borderWidth: 0
				}]
			},
			options: {
				tooltips: {
					tooltipFontSize: 10
				},
				legend: {
					display: false
				},
				cutoutPercentage: 80,
				responsive: false,
				animation:{
					animateScale:true
				}
			}
		};

  	if(group.slug == 'custom') {
			const chart = new Chart(this.refs.chart.getContext('2d'), doughnutOptions);

			this.setState({
				chart
			})
		}
	}

  render() {
    const { group, rotate, children, labelRotate, total } = this.props;
    const styleRotate = { WebkitTransform: `rotate(${rotate}deg)` };
    const styleDisabled = !total && 'disabled';

    return (
      <div className={`GroupCircle__container line-normal text-center ${styleDisabled}`} style={styleRotate}>
        <p
          className="title-icons titulo__p--grupos"
          style={{WebkitTransform: `rotate(${labelRotate}deg)`}}>
          {group.name}
        </p>
        <div
          className={`icon-group ${(group.slug && group.slug != 'custom') && group.slug}`}
          style={{WebkitTransform: `rotate(${labelRotate}deg)`}}
          onClick={this._handleClick.bind(this, group)}
				>
					{group.slug == 'custom' && <span>{total || 0}</span>}
					{group.slug == 'custom' && <canvas ref="chart" />}

        </div>
        <div className="content-line" />
        {children &&
        <div className="line-normal text-center">
          {children}
        </div>
				}
      </div>
    );
  }
}

GroupCircle.protoTypes = {
  group: PropTypes.object,
  rotate: PropTypes.number,
  handleClick: PropTypes.func,
  total: PropTypes.number, // Temp
};

export default GroupCircle;
