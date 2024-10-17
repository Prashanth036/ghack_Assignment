import API from "./axiosreq";

class ApiEndpoints{


    static register(data){
        return API.post("/register",data);
    }
    static login(data){
        return API.post("/login",data);
    }
    static fetchToons(){
        return API.get("/webtoons");
    }
    static fetchToonDetails(id){
        return API.get(`/webtoon_detail/${id}`);
    }
    static addFavouriteWeb(body){
        return API.post(`/user/addFavourites`,body);
    }
    static getFavouriteWeb(){
        return API.get(`/user/favourites`);
    }
   
}

export default ApiEndpoints