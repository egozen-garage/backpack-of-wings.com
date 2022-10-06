import React, {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';
import MovebankDataYear from '../json/MovebankDataYear.json';
import countriesData from "../json/GeoChart.world.geo.json";
// import riversData from "../json/rivers.geo.json";
import '../css/svgStyle.css';
import { stackOrderNone } from 'd3';
// import sampleData from '../json/sampledata.json';
import useResizeObserver from '../utilities/useResizeObserver'

// C O L O R S
const canvasBG = "blue";
const strokeColor = "coral";
const circleColor = "DarkGreen";
const lastLocationCircleColor = "red";
const countryOutlineColor = canvasBG;

// S I Z E S
const CircleRadius = 2;

// D3 setup
// prepare dataset variable
let projection;
let pathGenerator;


// Call Movebank API and provide array
export default function MovebankData2({zoomedOut}) {
    let dataReceived = false;
    // all API Data
    const apiUrl = 'https://www.movebank.org/movebank/service/public/json?&study_id=10449318&individual_local_identifiers=HL457%20%283083%29&sensor_type=gps&event_reduction_profile=EURING_03';
    let [movebankData, setMovebankData] = useState(null)
    useEffect(() => {
        // const apiUrl = props.apiUrl;
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
        return <DrawSVG birdData={movebankData} zoomedOut={zoomedOut}/>
    }
}


function DrawSVG(props){
    const myRef = useRef(null)
    const wrapperRef = useRef(null)
    
    const dimensions = useResizeObserver(wrapperRef);
    
    const [selectedCountry, setSelectedCountry] = useState(null);
    
    let svg = d3.select(myRef.current);
    // will be called initially and on every data change
    useEffect(() => {
        function handleResize() {
            svg.selectAll('.svg-content')
                .attr('transform', function(){
                    return "translate(" + window.innerWidth/2 + "," + window.innerHeight/2 + ")"
                })
        }
        window.addEventListener('resize', handleResize)
        // select SVG tag -> see render()

        // let svg = d3.select(myRef.current);



        // L A S T    L O C A T I O N     D A T A
        // -----------------------------------------------------------------
        let lastItemCount = props.birdData.length-1
        let current_latitude = props.birdData[lastItemCount].location_lat
        let current_longitude = props.birdData[lastItemCount].location_long
        console.log("last entry: " + lastItemCount + props.birdData[lastItemCount].timestamp)
        

        // use resized dimensions
        // but fall back to getBoundingClientRect, if no dimensions yet.
        const { width, height } =
        dimensions || wrapperRef.current.getBoundingClientRect();

        // setup D3 & SVG elements
        // -----------------------------------------------------------------
        SetD3Projection(svg, current_longitude, current_latitude, props.zoomedOut, wrapperRef.current, width, height, selectedCountry );
        Canvas(svg);
        Countries(svg);
        // Rivers(svg, riversData);
        LinesLatest(svg, props.birdData, lastItemCount);
        CirclesLatest(svg, props.birdData);
        CirclesOfYear(svg, MovebankDataYear);
        Button(svg);


        console.log("wrapper container: " + wrapperRef.current)
    }, [countriesData, dimensions, selectedCountry]);


        if(props.zoomedOut){
            // svg.select(".svg-content")
            //     .transition()
            //     .duration(750)
            //     .attr("transform", "");

            var yearBounds = [];

            d3.selectAll(".circles-year").selectAll(".circle").each(function(d) {
                yearBounds.push(pathGenerator.bounds(d))
            });
            console.log("yearBounds: " + yearBounds)

            var bounds = pathGenerator.bounds(yearBounds[0]),
                dx = bounds[1][0] - bounds[0][0],
                dy = bounds[1][1] - bounds[0][1],
                x = (bounds[0][0] + bounds[1][0]) / 2,
                y = (bounds[0][1] + bounds[1][1]) / 2,
                scale = .9 / Math.max(dx / window.innerWidth, dy / window.innerHeight),
                translate = [window.innerWidth / 2 - scale * x, window.innerHeight / 2 - scale * y];
                
            console.log("bounds - dx: " + dx + " dy: " + dy + " x: " + x + " y: " + y);
            
            svg.select(".svg-content").transition()
                .duration(750)
                .style("stroke-width", 1.5 / scale + "px")
                .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
        } else {
            // default state
            svg.select(".svg-content")
                .transition()
                .duration(750)
                // .attr("transform", "scale(2)");
                .attr("transform", "");

                // .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
        }


    // D 3  -  define P R O J E C T I O N    center & zoom
    // -----------------------------------------------------------------
    function SetD3Projection(svg, current_longitude, current_latitude, zoomStatus, wrapperRefDiv, width, height, selectedCountry){
        console.log("wrapper container: " + wrapperRefDiv)
        
        // projects geo-coordinates on a 2D plane
        // projection = d3.geoMercator().scale(zoomScale);
        

        projection = d3.geoMercator()
            // .fitSize([width, height], selectedCountry || countriesData)
            // .precision(100);
        // takes geojson data,
        // transforms that into the d attribute of a path element
        pathGenerator = d3.geoPath().projection(projection);


        // define center of map --> latest bird location
        // projection.center([current_longitude, current_latitude])
        
        // define default projection to 0, 0
        projection
        // .translate([0, 0])
        .translate([width / 2, height / 2]);
        // projection.scale(500);

    }

    // Click to Zoom
    // -----------------------------------------------------------------
    function Button(svg){
        d3.select("#scaling").on("click", function() {
            svg.select(".svg-content").attr("transform", "scale(2)");
            // projection.fitExtent([[0,0],[1,1]],geojsonObject).
            console.log("hello world, parent button pressed");
        });
        // setSelectedCountry(selectedCountry === feature ? null : feature);
    }

    // S V G    C A N V A S
    // -----------------------------------------------------------------
    function Canvas(svg){
        // define style and size of SVG tag
        svg.attr('width', '100vw')
            .attr('height', '100vh')
            // .attr("viewBox", [0, 0, width, height])
            .style('background-color', canvasBG);
        // translate svg-content container to the center of window
        svg.selectAll('.svg-content')
            .attr('transform', function(){
                return "translate(" + window.innerWidth/2 + "," + window.innerHeight/2 + ")"
            })
    }

    // C O U N T R I E S  - add to the map
    // -----------------------------------------------------------------
    function Countries(svg){
        // render each country
        svg.select(".svg-content")
        .append("g")
        .attr('class','countries')
        .selectAll(".country")
        .data(countriesData.features)
        .join("path")
        // .on("click", (event, feature) => {
        //     setSelectedCountry(selectedCountry === feature ? null : feature);
        // })
        .attr("class", "country")
        // .transition()
        // .attr("fill", feature => colorScale(feature.properties[property]))
        .attr("fill", "black")
        .attr("stroke", countryOutlineColor)
        .attr("d", feature => pathGenerator(feature))
        // .style("stroke-dasharray", ("5, 20"))
        .attr("stroke-width", 3);
    }

    // R I V E R S  - add to the map
    // -----------------------------------------------------------------
    // data set is from Ireland 
    function Rivers(svg, data){
        // render each country
        svg.select(".svg-content")
            .append("g")
            .attr('class','rivers')
            .selectAll(".river")
            .data(data.features)
            .join("path")
            .attr("class", "river")
            .attr("fill", "blue")
            // .attr("stroke", countryOutlineColor)
            .attr("stroke", "blue")
            .attr("d", feature => pathGenerator(feature));
    }
    // C I R C L E S
    // -----------------------------------------------------------------
    function CirclesLatest(svg, data){
            // draw circle for each entry in birdData
            svg.select(".svg-content")
                .append("g").attr('class','circles')
                .selectAll("circle")
                .data(data)
                .join("circle")
                .attr('class','circle')
                .attr("transform", d => `translate(${projection([d.location_long, d.location_lat])})`)
                // C I R C L E S - change size/radius 
                .attr("r", CircleRadius)
                    .style("fill", circleColor)
                    .append("title")
                    .text(d => "time stamp: " + d.timestamp + " latitude: " + d.location_long + " longitude: " + d.location_lat);
            // style of current position (last circle of birdData)
            svg.selectAll("circle:last-child").attr('class','last-circle')
                .attr("r", CircleRadius)
                .style("fill", lastLocationCircleColor)
                .append("title").text(d => "last location");
    }
    // L I N E S
    // -----------------------------------------------------------------
    function LinesLatest(svg, data, lastItemCount){
            // convert API data to an array --> each item of the array should have 2 GPS locations (start and end) to draw a line
            // var data = this.props.birdData;
            var linesArray = [];
            // for(var i in data){
            for(var i = 0; i < lastItemCount; i++){
                var nextCount = i + 1;
                // console.log('nextCount = ', typeof nextCount + nextCount +" / i = " +  typeof i + i);
                var source = [+data[i].location_long, +data[i].location_lat];
                var target = [+data[nextCount].location_long, +data[nextCount].location_lat];
                let topush = {type: "LineString", coordinates: [source, target]}
                linesArray.push(topush)
            }
            // console.log('line data array', linesArray);
            // A path generator
            const path = d3.geoPath().projection(projection)

            // Add the path
            svg.select(".svg-content")
                .append("g").attr('class','lines').selectAll("myPath")
                .data(linesArray)
                .enter()
                .append("path")
                    .attr('class','line')
                    .attr("d", function(d){ 
                        // console.log("linesArray content: " + typeof path(d))
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

                        // console.log("path array: part 1: " + parseFloat(splitArr[0].replace('M', '')) + "part 2: " + parseFloat(splitArr[1]) ); 

                        let modifiedString = "M " + positionA1 + " " + positionA2 + ", C " + bezierA1 + " " + bezierA2 + " " + bezierB1 + " " + bezierB2 + " " + positionB1 + " " + positionB2;
                        return modifiedString
                        // return path(d)
                    })
                    .style("fill", "none")
                    .style("stroke", strokeColor)
                    // L I N E - stroke width
                    .style("stroke-width", 2)
    }
    // Y E A R  E V E N T S  -  data of one year
    // -----------------------------------------------------------------
    function CirclesOfYear(svg, data){
            // draw circle for each entry in birdData
            svg.select(".svg-content")
                .append("g").attr('class','circles-year')
                .selectAll("circle")
                .data(data.individuals[0].locations)
                .join("circle")
                .attr('class','circle')
                .attr("transform", d => `translate(${projection([d.location_long, d.location_lat])})`)
                // C I R C L E S - change size/radius 
                .attr("r", CircleRadius)
                .style("fill", "#FF3333")
                .append("title")
                .text(d => "city: " + d.city + " latitude: " + d.location_long + " longitude: " + d.location_lat);
            // style of current position (last circle of birdData)
            svg.selectAll("circle:last-child").attr('class','last-circle')
                .attr("r", 10.5)
                .append("title").text(d => "last location");
    }
    

    // render() {
        return(
            <div ref={wrapperRef}>
            <button style={{position:'absolute', backgroundColor: "white", marginTop:"40px"}} id="scaling">Switch from linear to quadratic scale</button>

                <h2 style={{position:'absolute', backgroundColor: "white", marginTop:"20px"}}>It is {String(props.zoomedOut)}.</h2>
                <svg ref={myRef} className='outline' ><g className='svg-content'></g></svg>
            </div>
        )
    // }
}


// usefull tutorials:
// https://www.youtube.com/watch?v=gGORNzKIXL4&t=289s
// https://github.com/muratkemaldar/using-react-hooks-with-d3/tree/12-geo