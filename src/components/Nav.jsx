import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {isActiveToken} from './AccessTokenContext';


const Nav = () => {
  const navigate=useNavigate();
  const [accessResult, setAccessResult]=useState(null);
  const [user_id, setUserId]= useState(null);
  const accessToken=localStorage.getItem('accessToken');

  function logout(){
    localStorage.removeItem('accessToken');
    setAccessResult(false);
    navigate("/")
  }

  useEffect(()=>{
    //accessToken사용할 코드
    const verifyToken= async () =>{
      const result = await isActiveToken(accessToken);
      setAccessResult(result.accessResult)
      setUserId(result.user_id)
    }
    verifyToken();
  },[accessToken, accessResult]);



  return (
    <div>
            <ul>
                <li><Link to="/">홈</Link></li>
         
                <li><Link to="/product">미끼관련</Link></li>
                        <li>
                            <span>{user_id}님, 안녕하십니까?</span>
                        </li>
                        <li>
                            <button className="logout-button" onClick={logout}>로그아웃</button>
                        </li>
                        <li><Link to="/login">로그인</Link></li>
                        <li><Link to="/signup">회원가입</Link></li>
                        
            
            </ul>
    </div>
  );
};

export default Nav;