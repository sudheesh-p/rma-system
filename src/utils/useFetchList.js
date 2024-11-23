import React, { useEffect, useState } from 'react'

const useFetchList = (url) =>{
    const [fetchList, setFetchList] = useState([]);
    useEffect(() =>{
        getAllList();
    },[url]);

    async function getAllList() {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Failed to fetch list');
          }
          // Parse the response body (it's already JSON)
          const data = await response.json();
          const dataList = data?.body ? data?.body : data;
          setFetchList(dataList);
        } catch (error) {
          console.error('Error fetching list:', error);
        }
      };
      return fetchList;
}

export default useFetchList