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
let width = 1200;
let height2 = '100vh';
let width2 = '100vw';
let projection = d3.geoEquirectangular().scale(1000000).translate([width/2, height/2]);


class DrawSVG extends React.Component { 
    constructor(props){
        super(props);
        console.log('hi welcome data', this.props.birdData);
        this.myRef = React.createRef();
    }
    
    
    
    componentDidMount(){
        // select SVG tag -> see render()
        let svg = d3.select(this.myRef.current);

        // define style and size of SVG tag
        svg
            // .attr("viewBox", [0, 0, width, height])
            .attr('width', width2)
            .attr('height', height2)
            .attr('viewBox','0 0 '+Math.min(width2,height2) +' '+Math.min(width2,height2) )
            // .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")")
            .style('background-color', '#7FFFD4');
        
        
        let lastItemCount = this.props.birdData.length-1
        let current_latitude = this.props.birdData[lastItemCount].location_lat
        let current_longitude = this.props.birdData[lastItemCount].location_long
        console.log("last entry: " + lastItemCount + this.props.birdData[lastItemCount].timestamp)

        // center position of geo view
        projection.center([current_latitude, current_longitude]);




        // draw LINES
        // convert API data to a array --> each item of the array should have 2 GPS locations (start and end) to draw a line
        var data = this.props.birdData;
        var linesArray = [];
        // for(var i in data){
        for(var i = 0; i < lastItemCount; i++){
            var nextCount = i + 1;
            // console.log('nextCount = ', typeof nextCount + nextCount +" / i = " +  typeof i + i);
            var source = [+data[i].location_lat, +data[i].location_long];
            var target = [+data[nextCount].location_lat, +data[nextCount].location_long];
            let topush = {type: "LineString", coordinates: [source, target]}
            linesArray.push(topush)
        }
        console.log('line data array', linesArray);
        // A path generator
        const path = d3.geoPath()
            .projection(projection)
        // Add the path
        svg.append("g").attr('class','lines').selectAll("myPath")
            .data(linesArray)
            .enter()
            .append("path")
                .attr("d", function(d){ 
                    // let line = "M" + d.coordinates[0][0]  + " " +  d.coordinates[0][1] + " L" + d.coordinates[1][0] + " " +  d.coordinates[1][1]
                    // console.log('create curvy path: ' + line)
                    // return path(line)
                    return path(d)
                })
                .style("fill", "none")
                .style("stroke", "orange")
                .style("stroke-width", 1)









        // draw circle for each entry in birdData
        svg.append("g").attr('class','circles')
            .selectAll("circle")
            // .data(sampleData.locations)
            .data(this.props.birdData)
            .join("circle")
            .attr("transform", d => `translate(${projection([d.location_lat, d.location_long])})`)
            .attr("r", 2)
            .append("title")
            .text(d => "time stamp: " + d.timestamp + " latitude: " + d.location_lat + " longitude: " + d.location_long);
        
        // style of current position (last circle of birdData)
        svg.selectAll("circle:last-child").attr('class','last-circle')
            .attr("r", 10.5)
            .style("fill", "#69b3a2")
            .append("title").text(d => "last location");

        






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