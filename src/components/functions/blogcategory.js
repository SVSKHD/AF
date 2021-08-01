import axios from "axios"

export const getBlogCategories = async () =>
await axios.get(`${process.env.REACT_APP_API}/blogcategories`);

export const getBlogCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/blogcategory/${slug}`);


export const updateBlogCategory = async(slug,blogcategory,authtoken)=>
await axios.put(`${process.env.REACT_APP_API}/blogcategory/${slug}`, blogcategory, {
  headers: {
    authtoken,
  },
});

export const createBlogCategory = async (blogc, authtoken) =>
await axios.post(`${process.env.REACT_APP_API}/blogcategory`, blogc, {
headers: {
authtoken,
},
});

export const removeBlogCategory = async (slug, authtoken) =>
await axios.delete(`${process.env.REACT_APP_API}/blogcategory/${slug}`, {
headers: {
authtoken,
},
});


