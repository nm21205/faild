import React, {useState} from 'react';
import { Button,  Form, Input, Upload , Divider, message } from 'antd';

import './UploadPage.scss'
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import { API_URL } from '../config/constants';
import {useNavigate} from 'react-router-dom'

const UploadPage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const navigate=useNavigate();

  const onFinish = (val) => {
    console.log('onFinish called');

    const productData = {
      name: val.name,
      description: val.description,
      imageUrl: imageUrl || '',
    };

    console.log('Submitting product data:', productData);

    axios.post(`${API_URL}/products`, productData)
      .then((result) => {
        console.log('Product uploaded:', result.data);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.log('Error uploading product:', error.response.data);
        message.error('에러가 발생했습니다.');
      });
  };

  const onChangeImage = (info) =>{
     if(info.file.status === "uploading"){
        return;
     }
     if(info.file.status === "done"){
        const response=info.file.response;
        const imageUrl=response.imageUrl;
        setImageUrl(imageUrl)
     }
  }

  return (
    <div className='uploadpage'>
      <Form name="basic" onFinish={onFinish}  >
        <Form.Item name="files" valuePropName='image'>
          <Upload name='image'  action={`${API_URL}/image`} listType='picture' showUploadList={false} onChange={onChangeImage}>
              {
                imageUrl ? (
                  <div className="upload-img1">
                    <img src={`${API_URL}/${imageUrl}`} alt="uploadImg" id="upload-img" />
                  </div>
                ) : (
                  <div className="upload-img">
                    <img src={process.env.PUBLIC_URL + '/img/icon/camera.png'} alt="" />
                    <span>이미지를 업로드해주세요</span>
                </div>
                )
              }
             

          </Upload>
        </Form.Item>
        <Divider />
        <Form.Item
          label={<span className='upload-label'>제목</span>}
          name="name"
          rules={[
            {
              required: true,
              message:'제목은 필수 입력사항입니다'
            }
          ]}
          >
          <Input placeholder='제목을 입력해 주세요' size="large" />
        </Form.Item>
        
        <Form.Item
          label={<span className='upload-label'>내용</span>}
          name="description"
          rules={[
            {
              required: true,
              message: '설명은 필수 입력사항입니다'
            }
          ]}
        >
          <TextArea placeholder='내용을 입력해 주세요' size="large" className='Textarea' />
        </Form.Item>

        
        <Form.Item label={null}>
          <Button  htmlType="submit" id="submit-button">
            등록하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UploadPage;