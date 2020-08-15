import React, { useEffect } from 'react';
import axios from 'axios';
import RenderPosts from './RenderPosts';

export default function MyGarden() {
    const [ posts, setPosts ] = React.useState([]);
    const getMyPosts = () => {
        axios
            .get(
                "api/getMyPosts",
                { headers: { Authorization: "Bearer " + sessionStorage.getItem("token") } }
            )
            .then(response => {
                setPosts(response.data);
            })
    }
    useEffect(getMyPosts, []);
    return (
        <RenderPosts posts={posts} getPosts={getMyPosts} isMyPosts/>
    )
}