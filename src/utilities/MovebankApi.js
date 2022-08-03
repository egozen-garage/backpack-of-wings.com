import React, {useState, useEffect} from 'react';
// import d3 from 'd3';
import * as d3 from 'd3';
// import sampleData from '../json/sampledata.json';


function MovebankAPI() {
    let dataReceived = false;

    // all API Data
    const apiUrl = 'https://www.movebank.org/movebank/service/public/json?&study_id=10449318&individual_local_identifiers=HL457%20%283083%29&sensor_type=gps&event_reduction_profile=EURING_03';
    let [movebankData, setMovebankData] = useState(null)
    useEffect(() => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => setMovebankData(data.individuals[0].locations))
            // .then((data) => console.log('This is your data', data.individuals[0].locations))
    },[])
    // console.log('This is your data', movebankData.id)

    if(!movebankData){
        return ( <pre>data loading...</pre>)
    }
    if(movebankData && !dataReceived){
        dataReceived = true;
        console.log("if is called")
        return <DrawSVG birdData={movebankData}/>
    }
 
}



let height = 800;
let width = 2000;
let projection = d3.geoNaturalEarth1();


class DrawSVG extends React.Component { 
    constructor(props){
        super(props);
        console.log('hi welcome data', this.props.birdData);
        this.myRef = React.createRef();
    }
    
    
    
    componentDidMount(){
        let accessToRef = d3.select(this.myRef.current);
        // accessToRef.style("background-color", "red")
        accessToRef.attr("viewBox", [0, 0, width, height]);
        
        
        let lastItemCount = this.props.birdData.length-1
        let current_latitude = this.props.birdData[lastItemCount].location_lat
        let current_longitude = this.props.birdData[lastItemCount].location_long
        console.log("last entry: " + this.props.birdData[lastItemCount].timestamp)



        accessToRef.append("g")
            .selectAll("circle")
            // .data(sampleData.locations)
            .data(this.props.birdData)
            .join("circle")
            .attr("transform", d => `translate(${projection([d.location_lat, d.location_long])})`)
            .attr("r", 1.5)
            .append("title")
            .text(d => "time stamp: " + d.timestamp + " latitude: " + d.location_lat + " longitude: " + d.location_long);
        
        d3.selectAll("circle:last-child")
            .attr("r", 10.5)
            .style("fill", "#69b3a2")
            .append("title").text(d => "last location");

        projection.scale(1000000).translate([width/2, height/2]);
        projection.center([current_latitude, current_longitude]) 

    }

    render() {
        return(
            <div>
            <svg ref={this.myRef} className='outline'></svg>
            </div>
        )
    }

}



export default MovebankAPI;