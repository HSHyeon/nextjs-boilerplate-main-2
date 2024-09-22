import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface IgStory {
  uri: string;
  creation_timestamp: number;
  title: string;
  text: string;
  cross_post_source: {
    source_app: string;
  };
}

interface StoryComponentProps {
  story: IgStory;
}
const StoryComp = ({ story }: StoryComponentProps) => {
  const [isValid, setIsValid] = useState(true);

  const handleError = () => {
    setIsValid(false);
  };

  useEffect(() => {
    if (!isValid) {
      return;
    }
  }, [isValid]);

  if (!isValid) {
    return null;
  }
  const fileExtension = story.uri ? story.uri.split(".").pop() : "";
  const formattedDate = new Date(story.creation_timestamp * 1000).toLocaleString(); 

  return (
    <>
      <FilmStrip>
        <FilmFrame>
          <div key={story.uri}>
            <Content>
              {story.uri ? (
                fileExtension === "mp4" ||
                fileExtension === "mov" ||
                fileExtension === "avi" ? (
                  <StoryVideo src={story.uri} controls onError={handleError} />
                ) : (
                  <StoryImg
                    src={story.uri}
                    alt="Story Image"
                    onError={handleError}
                  />
                )
              ) : (
                <p>
                  {story.text.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <br />}
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              )}
            </Content>
            <DateText>{formattedDate}</DateText>
          </div>
        </FilmFrame>
      </FilmStrip>
    </>
  );
};

export default StoryComp;

const Content = styled.div`
  background-color: #b3b3b3;
  color: white;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  line-height: 1.2rem;
  overflow: auto;
  min-height: 30rem;
  p{
    padding: 1rem;
  }
`;
const StoryImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;
const StoryVideo = styled.video`
  width: 100%;
`;
const DateText = styled.p`
  font-size: 12px;
  text-align: end;
  color: #aaa;
`
const FilmFrame = styled.div`
  border-radius: 5px;
  font-size: 18px;
  flex: 1;
`;

const FilmStrip = styled.div`
  width: calc(100% - 2.4rem);
  position: relative;
  border-radius: 10px;
  display: flex;
  margin: 0.3rem 0;
  justify-content: space-between;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 0.7rem;
    height: 100%;
    background: repeating-linear-gradient(
      #cbcbcb,
      #cbcbcb 0.7rem,
      transparent 0.7rem,
      transparent 1.4rem
    );
  }

  &::before {
    left: -1rem;
  }

  &::after {
    right: -1rem;
  }
`;
