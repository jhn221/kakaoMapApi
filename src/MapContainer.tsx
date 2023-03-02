import { useEffect } from 'react';

const MapContainer = () => {
 
 var map : kakao.maps.Map | null | undefined;

    useEffect(() => {
        console.log("map == ", map);

        if(!map){
            // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
            var infowindow = new kakao.maps.InfoWindow({zIndex:1});
            let container = document.getElementById('map') as HTMLElement; //지도를 담을 영역의 DOM 레퍼런스
            let options = { //지도를 생성할 때 필요한 기본 옵션
                center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
                level: 3 //지도의 레벨(확대, 축소 정도)
            };

            map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴      
        }
        
        const ps = new kakao.maps.services.Places()

        ps.keywordSearch("양천구 맛집", (data : any, status: any, _pagination: any) => {
            if (status === kakao.maps.services.Status.OK) {
              // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
              // LatLngBounds 객체에 좌표를 추가합니다
              const bounds = new kakao.maps.LatLngBounds()
      
              for (var i = 0; i < data.length; i++) {
                displayMarker(data[i])

                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
              }
      
              // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
              map!.setBounds(bounds)
            }
          })

          // 지도에 마커를 표시하는 함수입니다
        function displayMarker(place : any) {
            // 마커를 생성하고 지도에 표시합니다
            var marker = new kakao.maps.Marker({
              // 저거는 무조건 null이 아니다 라는 것을 알려주는 것 mmm!
                map: map!,
                position: new kakao.maps.LatLng(place.y, place.x) 
            });

            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', function() {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                infowindow.open(map!, marker);
            });
        }

      }, [])

    return (
        <div id="map" style={{ width: "100vw", height: "100vh" }} />
        
    );
}

export default MapContainer; 