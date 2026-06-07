import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import axiosInstance from "@/utils/axiosInstance";



function Home(){
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [published,setPublished] = useState(false)


    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(title.length <1 || content.length <1){
            return
        }
        const postRes = await axiosInstance.post(`/api/posts/post`,{
            title:title,
            content: content,
            published: published
        })
        console.log(postRes.data)
        
    }

    const toggleSwitch = ()=>{
        const newPublished = !published
        setPublished(newPublished)
    }
    return (
        <div className="border-2 rounded-2xl p-8 m-8" >
            <h1 className="text-2xl mx-auto max-w-3xl font-semibold pl-8 pb-8">Create a Post</h1>
            
            <form
            onSubmit={(e)=> {handleSubmit(e)}}
            className="max-w-3xl mx-auto p-8"
            >
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="published">Published</FieldLabel>
                    <Switch onClick={toggleSwitch} id="published" className="scale-125" />
                </Field>

                <Field>
                <FieldLabel htmlFor="title">
                    Title
                </FieldLabel>

                <Input
                    id="title"
                    placeholder="Enter a title"
                    value={title}
                    onChange={(e) =>
                    setTitle(e.target.value)
                    }
                />
                </Field>

                <Field>
                <FieldLabel htmlFor="content">
                    Content
                </FieldLabel>

                <Textarea
                    id="content"
                    placeholder="Write your post..."
                    className="min-h-64"
                    value={content}
                    onChange={(e) =>
                    setContent(e.target.value)
                    }
                />
                </Field>

                <Button type="submit">
                Publish Post
                </Button>
            </FieldGroup>
            </form>
        </div>
  );
}

export default Home