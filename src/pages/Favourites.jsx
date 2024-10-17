import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiEndpoints from "../api/api";

export  const FavoriteWebToons=()=>{
    const [webToonInfo, setWebToonsInfo] = useState([]);
    const [token, setToken] = useState("")
    useEffect(() => {
        async function fetchToons() {
            const token = localStorage.getItem('accessToken');
            const res = await ApiEndpoints.getFavouriteWeb();
            setToken(token)
            setWebToonsInfo(res.data)
            console.log(res)
        }
        fetchToons()
    }, [])
    let navigate = useNavigate()


    return (
        <>
            <div className="">
                <div className="text-3xl font-bold px-40 pt-20">
                                    Your Favorite Manga
                </div>
                <div className="flex flex-col justify-center w-[80%] mx-[10%]">
                    {webToonInfo.map((ele, idx) => {
                        return (<>
                            <div className="my-[4%] ">
                                <button className="text-3xl font-bold py-4 text-orange-500"
                                    onClick={() => navigate(`/webtoon_details/${idx + 1}`)}
                                >{ele.title}
                                </button>
                                <div><img src={ele.image} className="w-[100%]" /></div>
                                <div className="text-xl font-semibold  text-orange-500 py-4 flex justify-between ">

                                    <ul>
                                        <li>Creator : {ele.creator}</li>
                                        <li>Genre : {ele.genre}</li>
                                    </ul>
                                   
                                </div>
                                <div className="text-xl py-4">{ele.description}</div>
                            </div>
                        </>)
                    })}
                </div>
            </div>
        </>
    )
}