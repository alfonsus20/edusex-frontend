import { createContext, useContext, useEffect, useState } from "react";
import { fetchAllTopics } from "../api-fetch/topic";

const defaultValues = {
  topics: [],
  isFetchingTopics: false,
};

export const TopicContext = createContext(defaultValues);

export const TopicWrapper = ({ children }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const { data } = await fetchAllTopics();
        setTopics(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTopics();
  }, []);

  return (
    <TopicContext.Provider value={{ topics }}>{children}</TopicContext.Provider>
  );
};

export const useTopicContext = () => useContext(TopicContext);
