import { db } from "./firebase";
import {
  getDocs,
  onSnapshot,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, googleProvider } from "./firebase";
import axios from 'axios';

const addArticle = async (myArticleURL, articleSummary, articleTitle, articleImage) => {
    const articlesCollectionRef = collection(db, auth?.currentUser?.uid);
    try {
      await addDoc(articlesCollectionRef, {
        articleURL: myArticleURL,
        summary: articleSummary, 
        title: articleTitle,
        image: articleImage,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error Updating Database! Please try again!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.log(error);
    }
  };

export default async function getURLSummary(articleURL) {
    const options = {
      method: 'POST',
      url: 'https://tldrthis.p.rapidapi.com/v1/model/abstractive/summarize-url/',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'c7206de6e0mshcfffe32d8293449p1e04bdjsn8e67d8b7b5e4',
        'X-RapidAPI-Host': 'tldrthis.p.rapidapi.com'
      },
      data: {
        url: articleURL,
        min_length: 100,
        max_length: 300,
        is_detailed: false
      }
    };
    
    try {
        const response = await axios.request(options);
        addArticle(response.data["article_url"], response.data["summary"][0], response.data["article_title"], response.data["article_image"]);
        console.log(response.data);
        console.log(response.data["article_url"]);
        console.log(response.data["summary"][0]);
        console.log(response.data["article_title"]);
        console.log(response.data["article_image"]);
    } catch (error) {
        console.error(error);
    }
}