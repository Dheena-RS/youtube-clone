import React, { useEffect, useState } from 'react'
import './Recommended.css'

import { Link, useSearchParams } from 'react-router-dom'
import { API_KEY, value_converter } from '../../data'

const Recommended = ({categoryId}) => {
  const[apiData,setApiData]=useState([]);
  const fetchData=async()=>{
    const search_url=`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=45&q=tamil&relevanceLanguage=ta&regionCode=IN&type=video&videoCategoryId=${categoryId}&key=${API_KEY}`;
    try {
        const search_res = await fetch(search_url).then(res=>res.json());
        if (search_res.items && search_res.items.length > 0) {
            const videoIds = search_res.items.map(item => item.id.videoId).join(',');
            const relatedVideo_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoIds}&key=${API_KEY}`;
            await fetch(relatedVideo_url).then(res=>res.json()).then(data=>setApiData(data.items));
        } else {
            setApiData([]);
        }
    } catch (error) {
        console.error("Error fetching Tamil recommended videos:", error);
    }
  }
  useEffect(()=>{
    fetchData();
  },[])
  return (
    <div className='recommended'>
      {apiData.map((item,index)=>{
        return(
          <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className='side-video-list'>
        <img src={item.snippet.thumbnails?.maxres?.url || item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url} alt='' />
        <div className='vid-info'>
        <h4>{item.snippet.title}</h4>
        <p>{item.snippet.channelTitle}</p>
        <p>{value_converter(item.statistics.viewCount)} Views</p>
        </div>
        </Link> 
        )
      })}
       
    </div>
  )
}

export default Recommended