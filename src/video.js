import React, { Component } from "react";
import * as dashjs from "dashjs";
// const url = "https://ind01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fbitmovin-a.akamaihd.net%2Fcontent%2FMI201109210084_1%2Fmpds%2Ff08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd&data=04%7C01%7Caafreen.shaikh%40balajitelefilms.com%7C57399c0683f348df3ba108d90adddef5%7Cfe73178a23564ae4bdd5661b52aa6f08%7C1%7C0%7C637552770311445281%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C1000&sdata=INniuN6vmmxXJtsf%2BLJ7%2Bv5FCkvE%2Fc3puqx%2FRp3Opd4%3D&reserved=0"
const url = "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd"
export default function VideoComponent(){
    return (
        <div>
            <h3>Video Component</h3>
            <div>
                <video data-dashjs-player="" autoplay src={url} controls="true"></video>
            </div>
        </div>
    )
}