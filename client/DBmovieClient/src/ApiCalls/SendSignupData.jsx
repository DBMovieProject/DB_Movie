import React from 'react'
import axios from 'axios'

const SendSignupData = () => {
    const postSignupData = async (signup) => {
        try {
          const response = await axios.post(
            `http://localhost:3001/auth/signup`,
            signup
            );

            if (response.status === 201) {
                console.log('No errors!!!')
                return true
            }
        
          } catch (error) {
          console.error(error);
          return error.response.data
    
        }
      
      };
      return {
        postSignupData
      };
}

export default SendSignupData