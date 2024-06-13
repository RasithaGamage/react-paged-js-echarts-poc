import "./Content.css";
import {ReactEcharts} from "echarts-for-react";
import * as echarts from 'echarts/core';
import { React, useState, useEffect, createRef} from "react";
import { Handler, registerHandlers } from "pagedjs";


function Content() {
    const [isAfterRendered, setIsAfterRendered] = useState(false);
    const refchart = createRef(null);

    const option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
          },
        ],
      };

      useEffect(() => {

        class MyHandler extends Handler {
            // eslint-disable-next-line no-useless-constructor
            constructor(chunker, polisher, caller) {
                super(chunker, polisher, caller);
            }
            afterRendered(page) {
                console.log(page);

            // ---this part inject image into the page ------
                // const div = document.createElement("img");
                // div.src='https://picsum.photos/200/300'
                // page.appendChild(div)
            // ---end ------

                const chartDom = document.createElement('div');

                const chart = echarts.init(chartDom, null, { width:'800px', height:'300px', renderer: 'svg' });
                chart.setOption({ ...option }, true);
                
                const obj = chart.renderToSVGString();
                const blob = new Blob([obj], {type : 'image/svg+xml'});
                let url=URL.createObjectURL(blob);

                const div = document.createElement("img");
                div.src=url;

                page[0].element.querySelector('#chart1').appendChild(div.cloneNode())

                page[1].element.querySelector('#chart2').appendChild(div)
                // page[0].element.appendChild(div)
            }
        }

        registerHandlers(MyHandler);

      }, []);

  return (
    <div id="testId"> 
      {<>
        <section>
        <div className="no-break">
            <h1>Section 1</h1>
            {<div ref={refchart} id="chart1">
                {/* <ReactEcharts
                    option={option}
                    style={{ minWidth: "300px", minHeight: "auto" }}
                    opts={{ renderer: "svg" }}
                ></ReactEcharts> */}
                </div>}
            <p className="pagefooter"></p>
        </div>
      </section>
      <section>
      <div className="no-break">
            <h1>Section 2</h1>
            <div  id="chart2"></div>
            {/* {<ReactEcharts
                option={option}
                style={{ minWidth: "300px", minHeight: "auto" }}
                opts={{ renderer: "SVGRenderer" }}
            ></ReactEcharts>} */}
            <p className="pagefooter"></p>
        </div>
      </section>
      </>}
    </div>
  );
}

export default Content;
