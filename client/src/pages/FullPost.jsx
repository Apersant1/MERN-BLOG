import React ,{useEffect,useState} from "react";
import axios from "../axios"
import {useParams} from "react-router-dom"
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import MDEditor from '@uiw/react-md-editor';
export const FullPost = () => {
    const {id} = useParams();
    const [data,setData] = useState();
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`/posts/${id}`).then(res => {
            setData(res.data)
            setIsLoading(false)
        }).catch(()=>{
            alert("Ошибка при получение статьи!")
        })
    }, []);

if(isLoading){
    return <Post isLoading={isLoading}/>

}
    return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl}
        user={data.author}
        imageUrl={data.imageUrl}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown  rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}  children={data.text} />
        {/*  <MDEditor.Markdown source={data.text} style={{ whiteSpace: 'pre-wrap' }} />*/}
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
