'use strict';
angular.module('maaravi.directives')
    .directive('loading', [function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var collectionName, index, unwatchFn, indicator, indicatorText;
                if (attrs.ngOptions) {
                    index = attrs.ngOptions.indexOf('in ');
                    if (index !== -1) {
                        collectionName = attrs.ngOptions.substring(index + 3).trim().split(' ')[0];
                    }
                }
                indicatorText = attrs.loadingText || 'Loading...';
                if (collectionName) {
                    indicator = $('<span class="' + attrs.loadingClass + '" style="position:absolute; margin:1px 0 0 4px;">' + indicatorText + '</span>');
                    indicator.insertBefore(element);

                    element.attr('disabled', '');
                    unwatchFn = scope.$watch(collectionName, function (collection) {
                        if (collection) {
                            element.removeAttr('disabled');
                            if (indicator) {
                                indicator.remove();
                            }
                            unwatchFn();
                        }
                    });
                }
            }
        };
    }]);
