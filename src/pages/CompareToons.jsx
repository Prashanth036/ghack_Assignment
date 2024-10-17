import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ApiEndpoints from "../api/api";

export const WebToonDetails=()=>{
    const [toonDetails,setToonDetails]=useState([])
   const paraId=useParams();
   const token = localStorage.getItem('accessToken');

//    console.log(paraId.id-1)
    useEffect(()=>{
       async function fetch(){
      const res=await ApiEndpoints.fetchToonDetails(paraId.id-1)
      setToonDetails(res.data)
        }
        fetch()
    },[])
    console.log(toonDetails)
    return(
        <>
        <div className="w-[60%] mx-[20%]">
        <div className=" pt-20 text-3xl font-bold">Lore Olympus Webtoon: Jaw Dropping Seen on Media</div><div className="my-[4%] ">
            <button className="text-3xl font-bold py-4 text-orange-500"
                onClick={() => navigate(`/webtoon_details/${idx + 1}`)}
            >{toonDetails.title}
            </button>
            <div><img src={toonDetails.image} className="w-[100%]" /></div>
            <div className="text-xl font-semibold  text-orange-500 py-4 flex justify-between ">

                <ul>
                    <li>Creator : {toonDetails.creator}</li>
                    <li>Genre : {toonDetails.genre}</li>
                </ul>
                {token && <button
                    onClick={() => ""}
                    className="bg-green-600 rounded-2xl text-sm  text-white px-2 my-2">
                    Add to Fav</button>}
            </div>
            <div className="text-xl py-4">{toonDetails.description}</div>
        </div>
        <div className="w-[60%] mx-[20%]">
        <LeaveReplyForm />
        </div>
        </div>
        </>
    )
}



const LeaveReplyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    comment: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment *</label>
        <textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name *</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website</label>
        <input
          id="website"
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

