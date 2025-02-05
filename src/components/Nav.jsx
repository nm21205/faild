import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {isActiveToken, useAccessToken} from './AccessTokenContext';
import '../components/Nav.scss';



const Nav = () => {
  const navigate=useNavigate();
  const {accessResult, setAccessToken, user_id} = useAccessToken();
  const accessToken=localStorage.getItem('accessToken');

  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem('accessToken');
    navigate("/login");
  }

  useEffect(()=>{
    //accessToken사용할 코드
    const verifyToken = async () => {
      if (accessToken) {
        const result = await isActiveToken(accessToken);
        setAccessToken(result.accessResult ? accessToken : null);
      }
    }
    verifyToken();
  },[accessToken, setAccessToken]);



  return (
    <div>
            <ul className='nav-ul'>
                <li><Link to="/">홈</Link></li>
         
                <li><Link to="/product">미끼관련</Link></li>
                        {accessResult ? (
                          <>
                            <li>
                              <span>{user_id}님, 안녕하십니까?</span>
                            </li>
                            <li>
                              <button className="logout-button" onClick={logout}>로그아웃</button>
                            </li>
                          </>
                        ) : (
                          <>
                            <li><Link to="/login">로그인</Link></li>
                            <li><Link to="/signup">회원가입</Link></li>
                          </>
                        )}
            
            </ul>
    </div>
  );
};

export default Nav;