import { createContext, useContext, useEffect, useState } from "react";
import { fetchAllTopics } from "../api-fetch/topic";

const defaultValues = {
  topics: [],
  isFetchingTopics: false,
};

export const TopicContext = createContext(defaultValues);

export const TopicWrapper = ({ children }) => {
  const [topics, setTopics] = useState([]);
  const [isFetchingTopics, setIsFetchingTopics] = useState(false);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setIsFetchingTopics(true);
        const { data } = await fetchAllTopics();
        setTopics(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetchingTopics(false);
      }
    };
    fetchTopics();
  }, []);

  return (
    <TopicContext.Provider value={{ topics, isFetchingTopics }}>
      {children}
    </TopicContext.Provider>
  );
};

export const useTopicContext = () => useContext(TopicContext);
