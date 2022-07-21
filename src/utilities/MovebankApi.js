import React, {useState, useEffect} from 'react';
// import d3 from 'd3';
import * as d3 from 'd3';
import sampleData from '../json/sampledata.json';



function MovebankAPI() {
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
    if(movebankData[0].location_lat){
        return <DrawSVG birdData={movebankData}/>
    }
 
}


let height = 400;
let width = 800;
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
        accessToRef.append("g")
            .selectAll("circle")
            // .data(sampleData.locations)
            .data(this.props.birdData)
            .join("circle")
            .attr("transform", d => `translate(${projection([d.location_lat, d.location_long])})`)
            .attr("r", 1.5)
            .append("title")
            .text(d => d.location_lat);

        projection.scale(400).translate([width/2, height/2]);
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