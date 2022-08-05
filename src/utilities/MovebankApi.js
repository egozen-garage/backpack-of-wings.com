import React, {useState, useEffect} from 'react';
// import d3 from 'd3';
import * as d3 from 'd3';
import '../css/svgStyle.css'
// import sampleData from '../json/sampledata.json';
// import useWindowDimensions from './WindowSize';


    // call Window Size and prepare data package
    // let windowSize = [];
    // const { height, width } = useWindowDimensions();
    // let topush = {height: [height], width: [width]};
    // windowSize.push(topush)
    // console.log("windowSize array width: " + windowSize[0].width + "height: " + windowSize[0].height);


// Call Movebank API and provide array
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




// let height = 800;
// let width = 1200;
// let height2 = '100vh';
// let width2 = '100vw';
let projection = d3.geoEquirectangular().scale(1000000);

class DrawSVG extends React.Component { 
    constructor(props){
        super(props);
        console.log('hi welcome data', this.props.birdData);
        this.myRef = React.createRef();
    }


    
    componentDidMount(){

        // let lastWindowWidth = window.innerWidth; // 1000

        function handleResize() {
            
            // let widthCorrection = (window.innerWidth - lastWindowWidth); // 900 - 1000

            // console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
            // let updatedWindowWidth = window.innerWidth*0.1;
            // let updatedWindowHeight = window.innerHeight*0.1;
            // console.log('resized to: ', typeof updatedWindowWidth, 'x', updatedWindowHeight)

            // console.log('resized to: ', typeof widthCorrection, ' width: ', widthCorrection)




            svg.selectAll('.svg-content')
                .attr('transform', function(){
                    return "translate(" + window.innerWidth/2 + "," + window.innerHeight/2 + ")"
                })
        }
        window.addEventListener('resize', handleResize)
        




        // L A S T    L O C A T I O N    D A T A
        let lastItemCount = this.props.birdData.length-1
        let current_latitude = this.props.birdData[lastItemCount].location_lat
        let current_longitude = this.props.birdData[lastItemCount].location_long
        console.log("last entry: " + lastItemCount + this.props.birdData[lastItemCount].timestamp)

        // D 3   P R O J E C T I O N
        // define center of map --> latest bird location
        projection.center([current_latitude, current_longitude])
        // define default projection to 0, 0
        projection.translate([0, 0])

        // S V G 
        // select SVG tag -> see render()
        let svg = d3.select(this.myRef.current);
        // define style and size of SVG tag
        svg.attr('width', '100vw')
            .attr('height', '100vh')
            // .attr("viewBox", [0, 0, width, height])
            .style('background-color', '#7FFFD4')
            ;
        // translate svg-content container to the center of window
        svg.selectAll('.svg-content')
        .attr('transform', function(){
            return "translate(" + window.innerWidth/2 + "," + window.innerHeight/2 + ")"
        })

        // L I N E S
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
        svg.select(".svg-content")
            .append("g").attr('class','lines').selectAll("myPath")
            .data(linesArray)
            .enter()
            .append("path")
                .attr('class','line')
                .attr("d", function(d){ 
                    console.log("linesArray content: " + typeof path(d))
                    let  splitArr = path(d).split(/[L,]+/);
                    let positionA1 = parseFloat(splitArr[0].replace('M', ''));
                    let positionA2 = parseFloat(splitArr[1]);
                    let positionB1 = parseFloat(splitArr[2]);
                    let positionB2 = parseFloat(splitArr[3]);

                    // calculate Bezier curve value "C x x x x"
                    let bezierA1 = positionA1 - 50
                    let bezierA2 = positionA2 - 50
                    let bezierB1 = positionB1 + 50
                    let bezierB2 = positionB2 + 50

                    console.log("path array: part 1: " + parseFloat(splitArr[0].replace('M', '')) + "part 2: " + parseFloat(splitArr[1]) ); 

                    let modifiedString = "M " + positionA1 + " " + positionA2 + ", C " + bezierA1 + " " + bezierA2 + " " + bezierB1 + " " + bezierB2 + " " + positionB1 + " " + positionB2;
                    return modifiedString
                    // return path(d)
                })
                .style("fill", "none")
                .style("stroke", "orange")
                .style("stroke-width", 1)

        // C I R C L E S
        // draw circle for each entry in birdData
        svg.select(".svg-content")
            .append("g").attr('class','circles')
            .selectAll("circle")
            .data(this.props.birdData)
            .join("circle")
            .attr('class','circle')
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
            <svg ref={this.myRef} className='outline' ><g className='svg-content'></g></svg>
            </div>
        )
    }

}



export default MovebankAPI;