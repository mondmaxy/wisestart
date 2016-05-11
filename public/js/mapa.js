var map;
var markers = [];
var activeArea;
var typeSelect = $('#type');
var areaSelect = $('#area');
var trafficSelect = $('#traffic');

function initMap() {

    
    var penalolenCoordinates = [
    {lat: -33.459127,  lng: -70.572177},
    {lat: -33.462531,  lng: -70.562262},
    {lat: -33.463536,  lng: -70.544663},
    {lat: -33.462822,  lng: -70.541800},
    {lat: -33.465312,  lng: -70.531491},
    {lat: -33.459025,  lng: -70.529556},
    {lat: -33.459363,  lng: -70.515493},
    {lat: -33.463790,  lng: -70.515696},
    {lat: -33.498008,  lng: -70.508617},
    {lat: -33.506374,  lng:-70.524167},
    {lat: -33.512269,  lng: -70.541202},
    {lat: -33.509956,  lng: -70.588551},
    {lat: -33.508544,  lng:-70.589516},
    {lat: -33.505158,  lng: -70.589383},
    {lat: -33.489964,  lng: -70.580963},
    {lat: -33.468571,  lng: -70.576216}];

    var maculCoordinates = [
    {lat: -33.474948,  lng: -70.623122},
    {lat: -33.469853,  lng: -70.576726},
    {lat: -33.489957,  lng: -70.580916},
    {lat: -33.491578,  lng: -70.617487}];

    var maculCoordinates2 = [
    {lat: -33.491578,  lng: -70.617487},
    {lat: -33.489957,  lng: -70.580916},
    {lat: -33.509868,  lng: -70.590519},
    {lat: -33.508092,  lng: -70.613971}];

    var penalolenPoly = new google.maps.Polygon({
        paths: penalolenCoordinates,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#33FFFF',
        fillOpacity: 0.35,
        editable: false
      });

    var maculPoly = new google.maps.Polygon({
        paths: maculCoordinates,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#33FFFF',
        fillOpacity: 0.35,
        editable: false
    });

    var maculPoly2 = new google.maps.Polygon({
        paths: maculCoordinates2,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#33FFFF',
        fillOpacity: 0.35,
        editable: false
    });

    const penalolenCenter = new google.maps.LatLng(-33.4857978,-70.5487625);
    const maculCenter = new google.maps.LatLng(-33.489865, -70.598398);

    var penalolen = new Area(penalolenCenter, [penalolenPoly]);
    var macul = new Area(maculCenter, [maculPoly, maculPoly2]);
    

    activeArea = penalolen;
    
    

    


    map = new google.maps.Map(document.getElementById('map'), {
        center: penalolen.center,
        zoom: 13
    });



    typeSelect.on('change', function(){
        var type = this.value;

        deleteMarkers();

        var request = {
            location: activeArea.center,
            radius: '3000',
            types: [type]
        };

        var search = new google.maps.places.PlacesService(map);
        search.nearbySearch(request, callback);

    });

    
    areaSelect.on('change', function(){
        let area = this.value;

        if(this.value != null)
        {   
            typeSelect.prop('disabled', false);
            typeSelect.val("0");
        }
        

        activeArea.clear();
        deleteMarkers();

        switch (area) {
          case "penalolen":
            activeArea = penalolen;      
            break;
          case "macul":
            activeArea = macul;
            break;

          default:
            console.log("default");
            break;
        }
        activeArea.resetColor();
        map.panTo(activeArea.center);
        activeArea.show();
    });
    var bikeLayer = new google.maps.BicyclingLayer();
    var trafficLayer = new google.maps.TrafficLayer();
    
    trafficSelect.on('change', function(){
        let type = this.value;

        switch (type) {
            case "auto":
                bikeLayer.setMap(null);
                trafficLayer.setMap(map);
                break;

            case "bici":
                trafficLayer.setMap(null);
                bikeLayer.setMap(map);
                break;

            default:
                trafficLayer.setMap(null);
                bikeLayer.setMap(null);
                break;
        }
    });
    

    function createMarker(place) {
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
        markers.push(marker);
        var infowindow = new google.maps.InfoWindow({
           content: place.name
        });

        marker.addListener('click', function() {
        infowindow.open(map, marker);

        });
    }

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for(let polygon of activeArea.polygons)
            {
                for (var i = 0; i < results.length; i++)
                {
                    var place = results[i];
                    if(google.maps.geometry.poly.containsLocation(place.geometry.location, polygon))
                    {
                        createMarker(place);
                    }
                    
                }
            }
             activeArea.colorByMarkers();  
        }
    }
}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function clearMarkers() {
  setMapOnAll(null);
}

function deleteMarkers() {
  clearMarkers();
  markers = [];
}