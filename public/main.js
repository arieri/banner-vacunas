window.addEventListener('DOMContentLoaded', (event) => {

  function handleJson() {
    // set the dimensions and margins of the graph
    var margin = {
        top: 4,
        right: 4,
        bottom: 2,
        left: 2
      },
      width = 80 - margin.left - margin.right,
      height = 30 - margin.top - margin.bottom;

    // parse the date / time
    var parseTime = d3.timeParse("%Y-%m-%d");

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var x2 = d3.scaleTime().range([0, width]);
    var y2 = d3.scaleLinear().range([height, 0]);

    var x3 = d3.scaleTime().range([0, width]);
    var y3 = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        return y(d.value);
      });

    var valueline2 = d3.line()
      .x(function (d) {
        return x2(d.date);
      })
      .y(function (d) {
        return y2(d.value);
      });

    var valueline3 = d3.line()
      .x(function (d) {
        return x3(d.date);
      })
      .y(function (d) {
        return y3(d.value);
      });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#dataviz_01").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    var svg2 = d3.select("#dataviz_02").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    var svg3 = d3.select("#dataviz_03").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    d3.json('https://www.clarin.com/redaccionfiler/clarin/infografia/2022/data/msal/data_home.json', {
      cache: "no-store"
    }).then(function (data) {
      data_posit = data.positividad
      data_posit_serie = data.positividad_serie
      data_acti = data.activos
      data_acti_serie = data.activos_serie
      data_uti = data.internados_uti
      data_uti_serie = data.internados_uti_serie
      data_primera = data.primera
      data_primera_porc = data.primera_porc
      data_completo = data.completo
      data_completo_porc = data.completo_porc
      data_refuerzo = data.adicional_refuerzo
      data_refuerzo_porc = data.adicional_refuerzo_porc


      // format the data
      data_uti_serie.forEach(function (d) {
        d.date = parseTime(d.date);
        d.value = +d.value;
      });

      data_posit_serie.forEach(function (d) {
        d.date = parseTime(d.date);
        d.value = +d.value;
      });

      data_acti_serie.forEach(function (d) {
        d.date = parseTime(d.date);
        d.value = +d.value;
      });

      // Scale the range of the data
      x.domain(d3.extent(data_uti_serie, function (d) {
        return d.date;
      }));
      y.domain([
        d3.min(data_uti_serie, function (d) {
          return d.value;
        }),
        d3.max(data_uti_serie, function (d) {
          return d.value;
        })
      ]);

      x2.domain(d3.extent(data_posit_serie, function (d) {
        return d.date;
      }));
      y2.domain([
        d3.min(data_posit_serie, function (d) {
          return d.value;
        }),
        d3.max(data_posit_serie, function (d) {
          return d.value;
        })
      ]);

      x3.domain(d3.extent(data_acti_serie, function (d) {
        return d.date;
      }));
      y3.domain([
        d3.min(data_acti_serie, function (d) {
          return d.value;
        }),
        d3.max(data_acti_serie, function (d) {
          return d.value;
        })
      ]);

      // Add the valueline path.
      svg.append("path")
        .data([data_uti_serie])
        .attr("class", "line")
        .attr("d", valueline)
        .attr('marker-end', 'url(#dot)');

      svg2.append("path")
        .data([data_posit_serie])
        .attr("class", "line")
        .attr("d", valueline2)
        .attr('marker-end', 'url(#dot2)');

      svg3.append("path")
        .data([data_acti_serie])
        .attr("class", "line")
        .attr("d", valueline3)
        .attr('marker-end', 'url(#dot3)')

      svg.append('defs')
        .append('marker')
        .attr('id', 'dot')
        .attr('viewBox', [0, 0, 8, 8])
        .attr('refX', 4)
        .attr('refY', 4)
        .attr('markerWidth', 4)
        .attr('markerHeight', 4)
        .append('circle')
        .attr('cx', 4)
        .attr('cy', 4)
        .attr('r', 2.5)
        .style('fill', '#AA1F00');

      svg2.append('defs')
        .append('marker')
        .attr('id', 'dot2')
        .attr('viewBox', [0, 0, 8, 8])
        .attr('refX', 4)
        .attr('refY', 4)
        .attr('markerWidth', 4)
        .attr('markerHeight', 4)
        .append('circle')
        .attr('cx', 4)
        .attr('cy', 4)
        .attr('r', 2.5)
        .style('fill', '#AA1F00');

      svg3.append('defs')
        .append('marker')
        .attr('id', 'dot3')
        .attr('viewBox', [0, 0, 8, 8])
        .attr('refX', 4)
        .attr('refY', 4)
        .attr('markerWidth', 4)
        .attr('markerHeight', 4)
        .append('circle')
        .attr('cx', 4)
        .attr('cy', 4)
        .attr('r', 2.5)
        .style('fill', '#AA1F00');

      locale = d3.formatLocale({
        "decimal": ",",
        "thousands": ".",
        "grouping": [3],
        "currency": ["", "\u00a0€"]
      })

      format = locale.format(",")
      format0 = locale.format(",.0f")
      format1 = locale.format(",.1f")
      format2 = locale.format(",.2f")

      d3.select('#dataviz_positividad')
        .text(format2(data_posit) + "%");

      d3.select('#dataviz_activos')
        .text(format0(data_acti));

      d3.select('#dataviz_uti')
        .text(format0(data_uti));

      d3.select('#dataviz_primera')
        .text(format0(data_primera));

      d3.select('#dataviz_primera_porc')
        .text(format1(data_primera_porc) + "%");

      d3.select('#dataviz_completo')
        .text(format0(data_completo));

      d3.select('#dataviz_completo_porc')
        .text(format1(data_completo_porc) + "%");

      d3.select('#dataviz_refuerzo')
        .text(format0(data_refuerzo));

      d3.select('#dataviz_refuerzo_porc')
        .text(format1(data_refuerzo_porc) + "%");

    });

    doneTableBody();
  };

  handleJson();

  function doneTableBody() {
    console.log('Render done!');

    const btnLink = document.querySelector('.cta--enter');
    const btnMove = document.querySelector('.ux-slidearrow');

    function moveScroll() {
      const targetScroll = document.querySelector('#bannerVacunacion');
      targetScroll.classList.toggle('movescroll')
    };

    function openLink() {
      window.open(URL_ESPECIAL, '_blank')
    };
    btnMove.addEventListener('click', moveScroll)
    btnLink.addEventListener('click', openLink);

  }
});