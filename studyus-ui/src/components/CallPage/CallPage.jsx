import React from "react";
import "./CallPage.css";
import DailyIframe from '@daily-co/daily-js';
import { useEffect } from "react";


export default function CallPage() {
        //let callFrame = DailyIframe.wrap(MY_IFRAME);

        /*async function createFrameAndJoinRoom() {
                window.callFrame = window.DailyIframe.createFrame();
                callFrame.join({ url: "https://studyus.daily.co/My_Room" });
        }*/

        useEffect(() => {
                //createFrameAndJoinRoom()
                // This effect runs whenever myGroups changes
        }, []);

	return (
        <div className="call-page">
                <div>CALL PAGE</div>
                {/*<iframe src="https://studyus.daily.co/My_Room"></iframe>*/}

        </div>
	);
}