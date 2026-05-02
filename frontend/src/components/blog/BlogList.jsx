import BlogCard from "./BlogCard";

const BlogList = ({
  blogs = [],
  showStatus = false,
  showAuthor = true,
  editable = false,
  onEdit,
  onDelete
}) => {
  return (
    <div>
      {blogs.map((blog) => (
        <BlogCard
          key={blog._id}
          blog={blog}
          showStatus={showStatus}
          showAuthor={showAuthor}
          editable={editable}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default BlogList;