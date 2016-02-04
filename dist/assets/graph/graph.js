/*
# Copyright (c) 2001-2015, Aruba Networks, Inc.
# This material contains trade secrets and confidential information of Aruba
# Networks, Inc.
# Any use, reproduction, disclosure or dissemination is strictly prohibited
# without the explicit written permission of Aruba Networks, Inc.
# All rights reserved.
*/
(function (factory) {
  'use strict';
  if (typeof define === 'function') {
    define(['angular'], function(angular){
     factory(angular); 
    });
  } else {
    factory(angular);
  }
})(function(angular){  
  angular.module('awUIFramework.common', []);
});

angular.module("templates",[]).run(["$templateCache",function(a){a.put("scripts/common/graph/graph.html",'<div chart-data="graphData"></div>')}]);
/*
# Copyright (c) 2001-2015, Aruba Networks, Inc.
# This material contains trade secrets and confidential information of Aruba
# Networks, Inc.
# Any use, reproduction, disclosure or dissemination is strictly prohibited
# without the explicit written permission of Aruba Networks, Inc.
# All rights reserved.
*/

(function (factory) {
  'use strict';
  if (typeof define === 'function') {
    define(['angular','common/config'], function(angular){
     factory(angular); 
    });
  } else {
    factory(angular);
  }
})(function(angular){
  angular.module('awUIFramework.common.graph', ['templates']);
});

/*
# Copyright (c) 2001-2015, Aruba Networks, Inc.
# This material contains trade secrets and confidential information of Aruba
# Networks, Inc.
# Any use, reproduction, disclosure or dissemination is strictly prohibited
# without the explicit written permission of Aruba Networks, Inc.
# All rights reserved.
*/

(function(factory) {
  'use strict';
  if (typeof define === 'function') {
    define(['angular', 'highcharts3D', 'common/graph/config'], function(angular){
     factory(angular); 
    });
  } else {
    factory(angular);
  }
})(function(angular) {
  angular
    .module('awUIFramework.common.graph').directive('graph', Graph);   
  /**
   * Graph directive for rendering graph.
   * <div graph='chartData'></div>
   * @class awUIFramework.common.graph
   * @constructor
   */
    function Graph() {
      return {
        restrict: 'EA',
        template: '<div class="aw-highchart-container"></div>',
        scope: {
          chartData: '=',
          chartObj: '=?',
          rendererArryObj: '='
        },
        transclude: true,
        replace: true,
        link: function($scope, $element, $attrs) {
          //Update when charts data changes
          $scope.$watch('chartData', function(value) {
          // cleanup highchart
          if ($scope.chartObj && $scope.chartObj.hasOwnProperty('destroy')) {
            $scope.chartObj.destroy();
            $scope.chartObj = null;
          }

          if (!value) {
            return;
          }

          var parentWidth = $('.panel_content').width();
          var chartOptions = {
            chart: {
              type: 'line',
              spacingTop: 20,
              spacingRight: 20,
              spacingBottom: 20,
              spacingLeft: 20,
              width: parentWidth,
              options3d: {
                enabled: false,
                alpha: 10,
                beta: 10,
                depth: 250,
                viewDistance: 5,

                frame: {
                    bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },
                    back: { size: 1, color: 'rgba(0,0,0,0.04)' },
                    side: { size: 1, color: 'rgba(0,0,0,0.06)' }
                }
              }
            },
            title: {
              text: null
            },
            xAxis: {
              type: 'datetime',
              labels: {
                style: {
                  'color': '#646569',
                  'fontWeight': 'bold',
                  'fontSize': '14px',
                  'fontFamily': 'OpenSans'
                }
              }
            },
            yAxis: {
              title: {
                text: null
              },
              min: 0,
              labels: {
                style: {
                  'color': '#646569',
                  'fontWeight': 'bold',
                  'fontSize': '14px',
                  'fontFamily': 'OpenSans'
                }
              },
              plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
              }]
            },
            tooltip: {
              shared: true,
              backgroundColor: '#FFFFFF',
              borderColor: '#ade1ea',
              crosshairs: true,
              pointFormat: '<b>{series.name}:</b> {point.y}<br/>',
              style: {
                fontWeight: 'normal',
                fontSize: '10px',
                fontFamily: 'Verdana, sans-serif'
              }
            },
            legend: {
              borderWidth: 0,
              itemStyle: {
              'color': '#646569',
              'fontWeight': 'bold',
              'fontSize': '11px',
              'fontFamily': 'OpenSans'
             }
            },
            credits: {
              enabled: false
            },
            plotOptions: {
              series: {
                marker: {
                  enabled: false
                },
                events: {
                  // prevent user to uncheck all the legend items.
                  legendItemClick: function(event) {
                    var seriesIndex = this.index;
                    var series = this.chart.series;
                    var uncheckCount = 0;

                    for (var i = 0; i < series.length; i++) {
                      if (series[i].visible === false) {
                        uncheckCount++;
                      }
                    }

                    if (uncheckCount === series.length - 1) {
                      series[seriesIndex].show();
                      return false;
                    }
                    return true;
                  }
                }
              },
              column: {
                colorByPoint: true
              }
            },
            colors: [
              '#ade1ea',
              '#ff8300',
              '#c3c5c8',
              '#efe066',
              '#008375',
              '#004876',
              '#000000'
            ]
          };
         
          angular.merge(chartOptions, $scope.chartData);
          if (chartOptions.chart.type === 'pie' && chartOptions.chart.options3d 
            && chartOptions.chart.options3d.enabled) {
            chartOptions.plotOptions.pie = {depth: 50};
          }
          if (chartOptions.chart.type === 'bubble' && chartOptions.chart.options3d 
            && chartOptions.chart.options3d.enabled) {
             var series = $scope.chartData.series;
             for (var i = 0; i < series.length; i++) {
               $scope.chartData.series[i].marker = {fillColor: {
                    radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                    stops: [
                        [0, 'rgba(255,255,255,0.5)'],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[i]).setOpacity(0.5).get('rgba')]
                    ]
                }
               }
             }
           }

          //Display 'No Data Available' when the series is empty or avg is null
          if ($scope.chartData) {
            var seriesData = $scope.chartData.series;
            if (!seriesData || seriesData.length === 0) {
              chartOptions.subtitle = {
                'floating': true,
                'text': 'No Data Available',
                'verticalAlign': 'middle',
                'y': -5,
                'style': { 'font-size': '14px' }
              };
            }
          }

          // use default values if nothing is specified in the given settings
          chartOptions.chart.renderTo = $element[0];

          // attrs take higher priority for chart options
          if ($attrs.type) {
            chartOptions.chart.type = $scope.$eval($attrs.type);
          }
          if ($attrs.height) {
            chartOptions.chart.height = $scope.$eval($attrs.height);
          }
          if ($attrs.width) {
            chartOptions.chart.width = $scope.$eval($attrs.width);
          }
          var rendererHtmls = [];

          if ($scope.chartData.rendererHtmls != null &&
              $scope.chartData.rendererHtmls.length > 0) {
            angular.copy($scope.chartData.rendererHtmls, rendererHtmls);
            $scope.chartData.rendererHtmls = [];
          }
          Highcharts.setOptions({
            global: {
              useUTC: false // TODO: xxx Set from user prefereces
            }
          });
          $scope.chartObj = new Highcharts.Chart(chartOptions);
          if (rendererHtmls.length > 0) {
            $scope.chartObj.renderer.rect((window.innerWidth / 2 - 150), 100, 300, 100, 5)
              .attr({
                zIndex: 5,
                fill: 'blue',
                stroke: 'black',
                strokeWidth: 1,
                opacity: 0.85
              })
              .css({
                color: '#FFF',
                fontSize: '18px',
                stroke: '#CCC',
                strokeWidth: '1px'
              })
              .add();
            for (var i = 0; i < rendererHtmls.length; i++) {
              $scope.chartObj.renderer.text(rendererHtmls[i])
                .attr({
                  x: (window.innerWidth / 2 - 140),
                  y: (120 + (i * 10)),
                  zIndex: 10,
                  color: '#CCC',
                  'font-size': 13
                })
                .add();
            }
          }
         });
        }
      };
    }
});