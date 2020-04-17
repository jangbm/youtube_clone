import React, { useState } from "react";
import styled from "styled-components";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import Dropzone from "react-dropzone";
import axios from "axios";
import { useSelector } from "react-redux";

const { TextArea } = Input;
const { Title } = Typography;

const Container = styled.div`
  max-width: 700px;
  margin: 2rem auto;
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Display = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Box = styled.div`
  width: 300px;
  height: 240px;
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PrivateOption = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];

const CategoryOption = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Auto & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets" },
];

function VideoUploadPage(props) {
  const user = useSelector((state) => state.user);
  const [videoTitle, setVideoTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoPrivate, setVideoPrivate] = useState(0);
  const [category, setCategory] = useState(0);
  const [filePath, setFilePath] = useState("");
  const [duration, setDuration] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const onTitleChange = (e) => {
    setVideoTitle(e.currentTarget.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value);
  };

  const onPrivateChange = (e) => {
    setVideoPrivate(e.currentTarget.value);
  };

  const onCategoryChange = (e) => {
    setCategory(e.currentTarget.value);
  };

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    console.log(files);

    // axios.post("/api/video/uploadfiles", formData, config).then((response) => {
    //   if (response.data.success) {
    //     let variable = {
    //       filePath: response.data.filePath,
    //       fileName: response.data.fileName,
    //     };
    //     setFilePath(response.data.filePath);

    //     // gerenate thumbnail with this filepath !

    //     axios.post("/api/video/thumbnail", variable).then((response) => {
    //       if (response.data.success) {
    //         setDuration(response.data.fileDuration);
    //         setThumbnail(response.data.thumbsFilePath);
    //       } else {
    //         alert("Failed to make the thumbnails");
    //       }
    //     });
    //   } else {
    //     alert("failed to save the video in server");
    //   }
    // });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let variable = {
      // writer: user.userData._id,
      // titile: videoTitle,
      // description: description,
      // privacy: videoPrivate,
      // filePath:,
      // category: category,
      // duration:,
      // thumbnail:,
    };

    axios.post("/api/video/uploadVideo", variable).then((response) => {
      if (response.data.success) {
        // console.log(response.data);
        message.success("성공적으로 업로드를 했습니다.");

        setTimeout(() => {
          props.history.push("/");
        }, 3000);
      } else {
        alert("업로드 실패");
      }
    });
  };

  return (
    <Container>
      <TitleContainer>
        <Title level={2}>video upload</Title>
      </TitleContainer>
      <Form onSubmit={onSubmit}>
        <Display>
          <Dropzone onDrop={onDrop} maxSize={10000}>
            {({ getRootProps, getInputProps }) => (
              <Box {...getRootProps()}>
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: "3rem" }} />
              </Box>
            )}
          </Dropzone>
          <div>
            <img src alt />
          </div>
        </Display>
        <br />
        <br />
        <label>title</label>
        <Input onChange={onTitleChange} value={videoTitle} />
        <br />
        <br />

        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={description} />
        <br />
        <br />

        <select onChange={onPrivateChange}>
          {PrivateOption.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />

        <select onChange={onCategoryChange}>
          {CategoryOption.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="primary" size="large" onClick={onSubmit}>
          submit
        </Button>
      </Form>
    </Container>
  );
}

export default VideoUploadPage;
