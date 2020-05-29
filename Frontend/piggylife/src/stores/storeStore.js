import { observable, action, computed } from "mobx";
import agent from "../agent";

export default class StoreStore {
  @observable myposts = [];
  @observable store_name="";
  @observable storeItems = [];
  @observable detailPost = {};
  @observable top10 = [];
  @observable hotplace = [];
  @observable similar = [];

  @computed get mypostslength() {
    return this.myposts.length;
  }
  @computed get top10length() {
    return this.top10.length;
  }
  @computed get hotplacelength() {
    return this.hotplace.length;
  }
  @computed get similarlength() {
    return this.similar.length;
  }

  @action
  get_mypost() {
    //console.log("내가 작성한 먹킷리스트 불러오기");
    // return agent.Data.get_mypost()
    //   .then((res) => {
    //     this.setMyPosts(res.data.results);
    //   })
    //   .catch((err) => console.log(err));
  }

  @action
  get_top10() {
    return agent.Data.get_top10()
      .then((res) => {
        this.setTop10(res.data);
      })
      .catch((err) => console.log(err));
  }
  @action
  get_hotplace() {
    //  return agent.Data.get_hotplace()
    //    .then((res) => {
    //      this.setHotplace(res.data);
    //    })
    //    .catch((err) => console.log(err));
  }
  @action
  get_similar() {
    //  return agent.Data.get_similar()
    //    .then((res) => {
    //      this.setSimilar(res.data);
    //    })
    //    .catch((err) => console.log(err));
  }
  @action
  setMyPosts(myposts) {
    this.myposts = myposts;
  }

  @action search(store_name){
    this.store_name=store_name;
    return agent.Data.search(this.store_name)
      .then((res) => {
        // console.log(res.data);
        this.storeItems=res.data;        
        if(res.data.length === 0){
          alert("검색된 데이터가 없습니다.")
          window.location.reload();
        }
      })
      .catch((err) => alert("실패"))
  }

  @action detail(sid){
    return agent.Data.detail(sid)
      .then((res) => {
        this.detailPost = res.data;
        // console.log(res.data);
      })
      .catch((err) => alert("실패"))
  }

  @action upload(data){
    console.log(data)
    console.log(data.v_memo)
    console.log(data.isLike)
    console.log(data.sid)
    console.log(data.visited)
    // return agent.Data.upload(data)
    //   .then((res) => {

    //   })
    //   .catch((err) => alert("업로드 실패!"))
  @action
  setTop10(top10) {
    this.top10 = top10;
  }
  @action
  setHotplace(hotplace) {
    this.hotplace = hotplace;
  }
  @action
  setSimilar(similar) {
    this.similar = similar;
  }
}
