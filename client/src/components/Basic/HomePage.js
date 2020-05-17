import React, {Component} from "react";
import  ChartComponent  from "../Chart/Nasdaq";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBasic: true
		}
		this.generateDataPoints = this.generateDataPoints.bind(this);
	}
	
	generateDataPoints(noOfDps) {
		var xVal = 1, yVal = 100;
		var dps = [];
		for(var i = 0; i < noOfDps; i++) {
			yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
			dps.push({x: xVal,y: yVal});	
			xVal++;
		}
		return dps;
	}

    render() {
		const options = {
			theme: "light2", // "light1", "dark1", "dark2"
			animationEnabled: true,
			zoomEnabled: true,
			title: {
				text: "Try Zooming and Panning"
			},
			axisY: {
				includeZero: false
			},
			data: [{
				type: "area",
				dataPoints: this.generateDataPoints(500)
			}]
		}

        return (
			<div>
				<h1>HomePage</h1>
				<ChartComponent/>
		
			</div>
        )
    }
}

export default HomePage;