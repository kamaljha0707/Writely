import React from 'react'

   
 function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: '2-digit', year: 'numeric', month: 'short',  };
        const formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate;
    }


export default formatDate