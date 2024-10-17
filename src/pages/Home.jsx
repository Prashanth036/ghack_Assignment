import { useEffect, useState } from "react"
import ApiEndpoints from "../api/api"
import { Icon } from "@mui/material"
import { useNavigate } from "react-router-dom";


export const Home = () => {
    const [webToonInfo, setWebToonsInfo] = useState([]);
    const [token, setToken] = useState("")
    useEffect(() => {
        async function fetchToons() {
            const token = localStorage.getItem('accessToken');
            const res = await ApiEndpoints.fetchToons();
            setToken(token)
            setWebToonsInfo(res.data)
        }
        fetchToons()
    }, [])
    let navigate = useNavigate()
  async  function handleClick(ele){
         const res=await ApiEndpoints.addFavouriteWeb(ele);
         if(res){

            navigate("/user/favourites")
         }
         console.log(res)

    }

    return (
        <>
            <div className="">
                <div className="text-3xl font-bold px-20 pt-20">
                                    Top 10 Popular Webtoons with Over 50 million Views
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
                                    {token && <button
                                        onClick={(e) =>handleClick(ele)}
                                        className="bg-green-600 rounded-2xl text-sm  text-white px-2 my-2">
                                        Add to Fav</button>}
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