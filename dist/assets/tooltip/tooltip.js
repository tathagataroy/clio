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

angular.module("templates",[]).run(["$templateCache",function(t){t.put("scripts/common/tooltip/tooltip.html",'<span class="awapp tooltip">\n  <span ng-repeat-start="(key, content) in data">{{content.label}}: </span>\n  <span ng-repeat-end ng-class="content.threshold_crossed > 0 ? \'error\' : \'normal\'">{{content.value}}<br class="tooltip-separate"/></span>\n</span>')}]);
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
  'use strict';
  if (typeof define === 'function') {
    define(['angular', 'common/tooltip/config'], function(angular){
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



