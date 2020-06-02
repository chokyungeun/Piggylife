/*global kakao*/
import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import dotenv from "dotenv";
import { withRouter } from "react-router-dom";

dotenv.config();

@inject("storeStore")
@withRouter
@observer
class MapContent extends React.Component {
  constructor(props){
    super(props);
    this.state={
        latitude: "",
        longitude: "",
    }
  }

  async componentDidMount() {
    const script = document.createElement("script");
    await this.props.storeStore.get_post(sessionStorage.getItem("uid"));
    const list = this.props.storeStore.location;
    console.log(list)
    script.async = true;
    script.src =
      `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        let container = document.getElementById("Mymap");
        let options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 7
        };
        //map 생성
        const map = new window.kakao.maps.Map(container, options);
        // HTML5의 geolocation으로 사용할 수 있는지 확인
        if (navigator.geolocation) {
          // GeoLocation을 이용해서 접속 위치를 얻어옵니다
          navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도
            var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            message = '<div style="padding:5px;">현재 여기계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
            // 마커와 인포윈도우를 표시합니다
            displayMarker(locPosition, message);
          });
        } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
          var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
          message = 'geolocation을 사용할수 없어요..'
          displayMarker(locPosition, message);
        }
        // 지도에 마커와 인포윈도우를 표시하는 함수
        function displayMarker(locPosition, message) {
          // 마커를 생성합니다
          var marker = new kakao.maps.Marker({  
            map: map, 
            position: locPosition
          }); 
          var iwContent = message, // 인포윈도우에 표시할 내용
          iwRemoveable = true;
          // 인포윈도우를 생성
          var infowindow = new kakao.maps.InfoWindow({
            content : iwContent,
            removable : iwRemoveable
          });
          // 인포윈도우를 마커위에 표시
          infowindow.open(map, marker);
          // 지도 중심좌표를 접속위치로 변경
          map.setCenter(locPosition);
        } 

        // 마커 이미지
        var visited = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
        var willvis = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png"; 

        for (var i = 0; i < list.length; i ++) {
          // 마커 이미지의 이미지 크기 
          var imageSize = new kakao.maps.Size(24, 35); 
          var markerImage = null;
          // 마커 이미지를 생성
          if(list[i].vis === true){
            markerImage = new kakao.maps.MarkerImage(visited, imageSize); 
          }
          else if(list[i].vis === false){
            markerImage = new kakao.maps.MarkerImage(willvis, imageSize); 
          }
          // 마커를 생성
          var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: new kakao.maps.LatLng(list[i].lat, list[i].long), // 마커를 표시할 위치
            title : list[i].name + list[i].address, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image : markerImage, // 마커 이미지 
            clickable: true,
          });
          
          // 인포윈도우를 생성합니다
          var infowindow = new kakao.maps.InfoWindow({
            content : "<a href=/mydetail/"+list[i].pid +">"+list[i].name + "<br>" +list[i].address +"</a>",
            removable : true,
            clickable: true,
          });

          // 마커에 클릭이벤트를 등록합니다
          kakao.maps.event.addListener(marker, 'click', makeClickListener(map, marker, infowindow));
          kakao.maps.event.addListener(infowindow, 'click', ClickInfoListener(list[i].pid));
          }
          marker.setMap(map);
          // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
          function makeClickListener(map, marker, infowindow) {
            return function() {
                infowindow.open(map, marker);
                console.log("infowindow")
            };
          }

          function ClickInfoListener(id) {
            console.log("dd")
          }
      });
    };
  }
  render() {
    return (
      <MapContents id="Mymap"></MapContents>
    );
  }
}

const MapContents = styled.div`
  width: 100%;
  height: 92vh;
`;


export default MapContent;
