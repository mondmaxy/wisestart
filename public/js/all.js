"use strict";function setOnMap(o,t){var r=!0,n=!1,l=void 0;try{for(var i,e=o[Symbol.iterator]();!(r=(i=e.next()).done);r=!0){var a=i.value;a.setMap(t)}}catch(s){n=!0,l=s}finally{try{!r&&e["return"]&&e["return"]()}finally{if(n)throw l}}}function getPolygonsBy(o){return $.ajax({url:"/area/"+o+"/polygons"})}function colorByMarkers(o,t){0==t?o.setOptions({fillColor:"#33FFFF"}):3>t?o.setOptions({fillColor:"#33FF33"}):5>t?o.setOptions({fillColor:"#FFFF33"}):8>t?o.setOptions({fillColor:"#FF9933"}):10>t?o.setOptions({fillColor:"#FF3333"}):o.setOptions({fillColor:"#FF0000"})}function countMarkersInside(o,t){var r=0,n=!0,l=!1,i=void 0;try{for(var e,a=t[Symbol.iterator]();!(n=(e=a.next()).done);n=!0){var s=e.value;google.maps.geometry.poly.containsLocation(s.position,o)&&r++}}catch(f){l=!0,i=f}finally{try{!n&&a["return"]&&a["return"]()}finally{if(l)throw i}}return r}