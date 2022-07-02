import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { useParams} from "react-router-dom"
import db from '../firebase';

function Detail() {
    const { id } = useParams();
    const [movie, setMovie ]= useState()

    useEffect(() =>{
        //Grab the movie info from DB=
        db.collection("movies")
        .doc(id)
        .get()
        .then((doc)=>{
            if(doc.exist){
                //save the movie data
                setMovie(doc.data());
            } else {
                //redirect to home page
            }
        })

    }, [])

  return (
    <Container>
        {movie && (
            <>
                <Background>
                    <img src={movie.backgroundImg}/>
                </Background>
                <ImgTitle>
                    <img src={movie.titleImg}/>
                </ImgTitle>
                <Controls>
                    <PlayButton>
                        <img src='images\play-icon-black.png'/>
                        <span> PLAY</span>
                    </PlayButton>

                    <TrailerButton>
                        <img src='\images\play-icon-white.png'/>
                        <span> TRAILER</span>
                    </TrailerButton>

                    <AddButton>
                        <span>+ </span>
                    </AddButton>

                    <GroupWatchButton>
                        <img src='\images\group-icon.png'/>
                    </GroupWatchButton>

                </Controls>
                <SubTitle>
                    {movie.SubTitle}
                </SubTitle>
                <Description>
                    {movie.Description}
                </Description>
            </>
        )}
        
    </Container>
  )
}

export default Detail


const Container = styled.div`
    min-height: calc(100vh-70px);
    padding: 0 calc(3.5vw + 5px);
    position: relative;
`
const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    opacity: 0.8;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const ImgTitle = styled.div`
    height: 35vh;
    min-height: 170px;
    width: 35vw;
    min-width: 200px;
    margin-top: 20px;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`
const Controls = styled.div`
    display: flex;
    padding: 10px 0 0;
    align-items: center;
`
const PlayButton = styled.button`
    border-radius: 4px;
    font-size: 15px;
    font-weight: bold;
    padding: 0px, 24px;
    margin-right: 22px;
    display: flex;
    align-items: center;
    height: 40px;
    background: rgb(249, 249, 249);
    border: none;
    letter-spacing: 1.2px;
    cursor: pointer;

    &:hover {
        background: rgb(198, 198, 198);
    }
`
const TrailerButton = styled(PlayButton)`
    background: rgba(0,0,0,0.3);
    border: 1px solid rgb(249, 249, 249);
    color: rgb(249, 249, 249);
    text-transform: uppercase;
`
const AddButton = styled.button`
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-right: 22px;
    background: rgba(0, 0, 0, 0.6);
    border: 2px solid white;
    cursor: pointer;
    span {
        font-size: 40px;
        color: white;
    }
`
const GroupWatchButton = styled(AddButton)`
    background: rgba(0, 0, 0, 0.8);
`
const SubTitle = styled.div`
    color: rgb(249, 249, 249);
    font-size: 15px;
    min-height: 20px;
    margin-top: 26px;
`
const Description = styled.div`
    line-height: 1.4;
    font-size: 20px;
    margin-top: 10px;
    color: rgb(249, 249, 249);
    max-width: 700px;
`