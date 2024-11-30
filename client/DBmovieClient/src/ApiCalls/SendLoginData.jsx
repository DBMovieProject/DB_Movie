import React from 'react'
import axios from "axios";

const SendLoginData = () => {
    const postSigninData = async (login) => {
        try {
          const response = await axios.post(
            `http://localhost:3001/auth/login`,
            login
            );

            if (response.status === 201) {
                console.log('No errors!!!')
                return response.data
            }else if (response.status === 200) {
                console.log('No errors!!!')
                return response.data
            }
        
          } catch (error) {
          console.error(error);
          return error.response.data
    
        }
      
      };
  return {
    postSigninData
    }          
}

export default SendLoginData