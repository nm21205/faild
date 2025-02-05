import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config/constants';
import './ProductDetail.scss'; // CSS 파일을 import
// import { useAccessToken } from '../components/AccessTokenContext'; // 사용자 ID 가져오기

const ProductDetail = () => {
  const { id } = useParams(); // URL에서 ID를 가져옵니다.
  const [product, setProduct] = useState(null);
  // const [comments, setComments] = useState([]);
  // const [newComment, setNewComment] = useState('');
  // const { user_id } = useAccessToken(); // 사용자 ID 가져오기

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    // const fetchComments = async () => {
    //   try {
    //     const response = await axios.get(`${API_URL}/products/${id}/comments`);
    //     setComments(response.data.comments);
    //   } catch (error) {
    //     console.error("Error fetching comments:", error);
    //   }
    // };

    fetchProduct();
    // fetchComments();
  }, [id]);

  // const handleCommentSubmit = async () => {
  //   if (!newComment) return;

  //   try {
  //     const response = await axios.post(`${API_URL}/comments`, {
  //       content: newComment,
  //       post_id: id,
  //       user_id: user_id, // 실제 사용자 ID 사용
  //     });
  //     setComments([...comments, response.data.comment]);
  //     setNewComment('');
  //   } catch (error) {
  //     console.error("Error posting comment:", error);
  //   }
  // };

  if (!product) {
    return <div>Loading...</div>;
  }

  console.log('Product Image URL:', product.imageUrl); // 디버깅용 로그

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      
      {product.imageUrl ? (
        <img src={`${API_URL}/${product.imageUrl}`} alt={product.name} />
      ) : (
        <div> </div> // 이미지가 없을 때 대체 텍스트 또는 이미지
      )}
      
      <p>작성자: {product.author}</p>
      <p>작성일: {product.createdAt}</p>

      {/* 댓글 기능 제거
      <div>
        <h2>댓글</h2>
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.user_id}: {comment.content}</p>
          </div>
        ))}
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
        <button onClick={handleCommentSubmit}>댓글 추가</button>
      </div>
      */}
    </div>
  );
};

export default ProductDetail; 