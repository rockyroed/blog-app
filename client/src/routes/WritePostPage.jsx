import { useAuth, useUser } from "@clerk/clerk-react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../components/Upload";

const WritePostPage = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [value, setValue] = useState(null);
  const [cover, setCover] = useState(null);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { getToken } = useAuth();

  useEffect(() => {
    image && setValue((prev) => prev + `<p><img src="${image.url}" /><p>`);
  }, [image]);

  useEffect(() => {
    video &&
      setValue(
        (prev) => prev + `<p><iframe class="ql-video" src="${video.url}" /><p>`
      );
  }, [video]);

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: (res) => {
      toast.success("Post created successfully");
      navigate(`/${res.data.slug}`);
    },
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (isLoaded && !isSignedIn) {
    return <div>Access denied. You must be logged in.</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      image: cover.filePath || "",
      title: formData.get("title"),
      category: formData.get("category"),
      description: formData.get("description"),
      content: value,
    };

    mutation.mutate(data);
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-xl font-light">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <Upload type="image" setProgress={setProgress} setData={setCover}>
          <button
            type="button"
            className="w-max h-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white"
          >
            {cover ? "Modify" : "Add a"} cover image
          </button>
          <p className={`${!cover && "hidden"}`}>{cover?.name}</p>
        </Upload>
        <input
          className="text-4xl font-semibold bg-transparent outline-none"
          type="text"
          placeholder="Post title"
          name="title"
        />
        <div className="flex items-center gap-4">
          <label className="text-sm">Choose a category:</label>
          <select
            className="p-2 rounded-xl bg-white shadow-md outline-none"
            name="category"
          >
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="search-engines">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea
          className="p-4 rounded-xl bg-white shadow-md outline-none"
          name="description"
          placeholder="A short description"
        />
        <div className="flex flex-1">
          <div className="flex flex-col gap-2 mr-2">
            <Upload type="image" setProgress={setProgress} setData={setImage}>
              <button
                type="button"
                className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white"
              >
                🌆
              </button>
            </Upload>
            <Upload type="video" setProgress={setProgress} setData={setVideo}>
              <button
                type="button"
                className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white"
              >
                📽️
              </button>
            </Upload>
          </div>
          <ReactQuill
            theme="snow"
            className="flex-1 rounded-xl bg-white shadow-md"
            name="content"
            value={value}
            onChange={setValue}
            readOnly={0 < progress && progress < 100}
          />
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button
            type="submit"
            disabled={mutation.isPending || (0 < progress && progress < 100)}
            className="bg-blue-800 text-white font-medium rounded-xl p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? "Loading..." : "Send"}
          </button>
          {/* {"Progress: " + progress + "%"} */}
          {mutation.isError && (
            <div className="text-red-500 text-sm">
              {mutation.error.response.data.message}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default WritePostPage;
