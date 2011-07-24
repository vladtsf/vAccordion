/*
 *  vAccordion - Lightweight jQuery accordion
 *  Copyright (C) 2011  Vladimir Tsvang
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see http://www.gnu.org/licenses/.
 */

(function($, undefined){
  $.fn.vAccordion = function(params) {

    var config = $.extend({
      'duration'  : 300,
      'switcher'  : '> a',
      'toggle'    : '> div',
      'item'      : '> li',
      'onOpenStart' : function() {},
      'onOpenFinish' : function() {},
      'onCloseStart' : function() {},
      'onCloseFinish' : function() {}
    }, params);

    var $items = $(config.item, this);

    var getData = function(element, key, def) {
      var $element = $(element);
      var data = $element.data(key);
      if(data == undefined) {
        $element.data(key, def);
        data = $element.data(key);
      }
      return data;
    };

    $items.each(function(index, element) {
      $(config.switcher, element).click(element, function(Event) {
        var $item = $(element);
        var $toggles = $(config.toggle, $item);

        $toggles.each(function(index, toggle) {
          var $toggle = $(toggle);
          var state = getData($toggle, 'state', $toggle.css('display'));
          if(state == 'none') {
            config.onOpenStart(Event);
            $toggle.show(config.duration, function() {
              $toggle.data('state', 'block');
              config.onOpenFinish(Event);
            });
          } else {
            config.onCloseStart(Event);
            $toggle.hide(config.duration, function() {
              $toggle.data('state', 'none');
              config.onCloseFinish(Event);
            });
          }
        });
        return false;
      });
    });
    return this;
  };
})(jQuery);