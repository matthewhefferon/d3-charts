import { useState, useRef, useEffect } from "react";
import * as d3 from "d3";

function Pie() {
  const [data] = useState([
    { name: "A", value: 200 },
    { name: "B", value: 250 },
    { name: "C", value: 60 },
  ]);
  const svgRef = useRef();

  useEffect(() => {
    // Setting svg container
    const w = 500;
    const h = 500;
    const radius = w / 2;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible")
      .style("margin-top", "325px")
      .style("margin-left", "450px");

    // Setting up chart
    const formattedData = d3.pie().value((d) => d.value)(data);
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);
    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.name))
      .range(d3.schemeSet2);

    // Setting up svg data
    svg
      .selectAll()
      .data(formattedData)
      .join("path")
      .attr("d", (d) => arcGenerator(d))
      .attr("fill", (d) => color(d.data.name))
      .attr("opacity", 0.7);

      // Setting up annotations
        svg.selectAll().data(formattedData).join("text")
        .text(d => d.data.name)
        .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
        .style("text-anchor", "middle")

  }, [data]);

  return <svg ref={svgRef}></svg>;
}

export default Pie;
