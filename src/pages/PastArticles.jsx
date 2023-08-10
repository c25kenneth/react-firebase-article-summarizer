import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import {
  getDocs,
  onSnapshot,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, googleProvider } from "../config/firebase";
import { Button } from "@chakra-ui/react";
import ArticleCard from "../components/ArticleCard";

export default function PastArticles() {
  const userUID = auth?.currentUser?.uid;
  const articlesCollectionRef = collection(db, userUID.toString());
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const myArticles = onSnapshot(articlesCollectionRef, (querySnapshot) => {
      const articles = [];
      querySnapshot.forEach((doc) => {
        articles.push(doc.data());
      });
      console.log(articles);
      setArticles(articles);
    });
    return () => {
      myArticles();
    };
  }, []);

  return (
    <>
      {articles.map((article, index) => {
        return (
          <div key={index}>
            <ArticleCard
              articleSummary={article["summary"]}
              articleTitle={article["title"]}
              articleURL={article["articleURL"]}
              articleImage={article["image"]}
            />
          </div>
        );
      })}
    </>
  );
}
