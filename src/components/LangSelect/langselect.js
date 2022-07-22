import React from 'react';
import Lang from '../Lang/lang'
import { transcription } from '../../app.config';
import { useSelector, useDispatch } from "react-redux";


export default function LangSelect(){
    const dispatch = useDispatch();
    const  currentLang  = useSelector((state) => state['lang'].actualLang)
    const langData = transcription.find(lng => lng.lang === currentLang).data.header

    const changeLang = ((choosedLang)=>{
        return {
            type: "lang/setActualLang",
            payload: choosedLang
        }
    })

    return (
        <React.StrictMode>
            <label htmlFor="langselect">
                {
                    langData[0]
                }
            </label>
            <select 
                className="langselect" 
                id='langselect'
                onChange={(e)=> dispatch(changeLang(e.target.value))}
            >
                    {transcription.map && transcription.map((lang, index) => 
                    <Lang langName={lang.lang} key={index}></Lang>

            )}
               
            </select>
    </React.StrictMode>)
}