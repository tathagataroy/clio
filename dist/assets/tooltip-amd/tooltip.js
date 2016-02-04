
/*
# Copyright (c) 2001-2015, Aruba Networks, Inc.
# This material contains trade secrets and confidential information of Aruba
# Networks, Inc.
# Any use, reproduction, disclosure or dissemination is strictly prohibited
# without the explicit written permission of Aruba Networks, Inc.
# All rights reserved.
*/
(function (factory) {
  
  if (typeof define === 'function') {
    define('common/config',['angular'], function(angular){
     factory(angular); 
    });
  } else {
    factory(angular);
  }
})(function(angular){  
  angular.module('awUIFramework.common', []);
});

/*
# Copyright (c) 2001-2015, Aruba Networks, Inc.
# This material contains trade secrets and confidential information of Aruba
# Networks, Inc.
# Any use, reproduction, disclosure or dissemination is strictly prohibited
# without the explicit written permission of Aruba Networks, Inc.
# All rights reserved.
*/
(function (factory) {
  
  if (typeof define === 'function') {
    define('common/tooltip/config',['angular','common/config'], function(angular){
     factory(angular); 
    });
  } else {
    factory(angular);
  }
})(function(angular){
  angular.module('awUIFramework.common.tooltip', ['templates']);
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
  
  if (typeof define === 'function') {
    define('tooltip',['angular', 'common/tooltip/config'], function(angular){
     factory(angular); 
    });
  } else {
    factory(angular);
  }
})(function(angular) {
    angular
    .module('awUIFramework.common.tooltip').directive('tooltip', Tooltip);
   /**
   * Nav bar directive for rendering tooltip.
   * <div tooltip='data'></div>
   * @class awUIFramework.common.Tooltip
   * @constructor
   */
    Tooltip.$inject = ['$templateCache'];
    function Tooltip($templateCache) {
      return {
        restrict: 'E',
        templateUrl: 'scripts/common/tooltip/tooltip.html',
        replace: true,
        scope: {
          data: '='
        }
      };
    }
});




!function(t){define("templates",["angular"],function(n){t(n)})}(function(t){t.module("templates",[]),t.module("templates").run(["$templateCache",function(t){t.put("scripts/common/tooltip/tooltip.html",'<span class="awapp tooltip">\n  <span ng-repeat-start="(key, content) in data">{{content.label}}: </span>\n  <span ng-repeat-end ng-class="content.threshold_crossed > 0 ? \'error\' : \'normal\'">{{content.value}}<br class="tooltip-separate"/></span>\n</span>')}])});
/*
# Copyright (c) 2001-2015, Aruba Networks, Inc.
# This material contains trade secrets and confidential information of Aruba
# Networks, Inc.
# Any use, reproduction, disclosure or dissemination is strictly prohibited
# without the explicit written permission of Aruba Networks, Inc.
# All rights reserved.
# @Author Tathagata Roy
*/
(function() {
  
  /***********************************************************************/
  /******** Configuration for the ui-framework application starts ********/
  /***********************************************************************/  
  requirejs.config({
   baseUrl: '../scripts',
   paths: {
      'angular': '../scripts/lib/angular',
      'templates': '../dist/assets/tooltip-amd/templates',
      'tooltip': '../scripts/common/tooltip/tooltip.directive',
    },
    shim : {
      'angular': {
        exports: 'angular'
      }
    },
    deps: ['tooltip']
  });
  require(['templates','tooltip'],
    /**
     * Initializes the UI framework.
     * @method initialize
     * @private
     */
    function initialize() {
      angular.module("clio", ['awUIFramework.common.tooltip']);
      angular.bootstrap(document, ['clio']);    
    }
  );
  /******** Configuration for the ui-framework application ends ********/
})();

define("../amd/appConfig", function(){});
