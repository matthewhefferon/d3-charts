import { useState, useRef, useEffect } from "react";
import * as d3 from "d3";

function Line() {
  const [data] = useState([25, 50, 35, 94, 10]);
  const svgRef = useRef();

  useEffect(() => {
    // Setting svg container
    const w = 800;
    const h = 250;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("background-color", "#5E6168")
      .style("overflow", "visible")
      .style("margin-top", "75");

    // Setting up scales
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, w])

    const yScale = d3.scaleLinear()
    .domain([0, h])
    .range([h, 0]);

    const generateScaledLine = d3.line()
    .x((d, i) => xScale(i))
    .y(yScale)
    .curve(d3.curveCardinal);

    // Setting up axis
    const xAxis = d3.axisBottom(xScale)
    .ticks(data.length)
    .tickFormat(i => i + 1)
    const yAxis = d3.axisLeft(yScale).ticks(5);
    svg.append("g").call(xAxis).attr("transform", `translate(0, ${h})`);
    svg.append("g").call(yAxis);

    // Setting up line
    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr('d', d => generateScaledLine(d))
      .attr('fill', 'none')
      .attr('stroke', 'white')

  }, [data]);

  return <svg ref={svgRef}></svg>;
}

export default Line;