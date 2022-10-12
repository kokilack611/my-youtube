import React, { useEffect, useState } from 'react';
import './Video.scss';
import {AiFillEye} from 'react-icons/ai';
import request from '../../api';
import moment from 'moment/moment';
import numeral from 'numeral';

const Video = ({video}) => {
  const {id,snippet:{channelId,channelTitle,title,publishedAt,thumbnails:{medium}}}=video;
  const [views,setViews]=useState(null);
  const [duration,setDuration]=useState(null);
  const [channelIcon,setChannelIcon]=useState(null)
  const seconds=moment.duration(duration).asSeconds();
  const milliseconds=moment.utc(seconds*1000).format('mm:ss');

  //writing the following useEffect to manage inconsistent userdata
  useEffect(()=>{
    const getVideoDetails=async()=>{
        const res=await request.get('/videos',{
          params:{
            part:'contentDetails,statistics',
            id:id
          }
        })
        setDuration(res.data.items[0].contentDetails.duration)
        setViews(res.data.items[0].statistics.viewCount)
    }
    getVideoDetails();
  },[id])
  //writing another similar useeffect to get the channel icons
  useEffect(()=>{
    const getChannelIcons=async()=>{
        const res=await request.get('/channels',{
          params:{
            part:'snippet',
            id:channelId
          }
        })
        setChannelIcon(res.data.items[0].snippet.thumbnails.default)
    }
    getChannelIcons();
  },[channelId])
  return (
    <div>
      <div className="video">
        <div className="video-top">
          <img src={medium.url} alt="thumbnail" />
          <span>{milliseconds}</span>
        </div>
        <div className="video-title">
          {title}
        </div>
        <div className="video-details">
          <span>
            <AiFillEye/> {numeral(views).format('0.a')} views •{" "}
          </span>
          <span>
            {moment(publishedAt).fromNow()}
          </span>
        </div>
        <div className="video-channel">
          <img src={channelIcon?.url} alt="channel-logo" />
          <p>{channelTitle}</p>
        </div>
      </div>
    </div>
  )
}

export default Video
