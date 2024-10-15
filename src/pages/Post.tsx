import usePosts from "../hooks/queries/usePosts.ts";

export default function PostPage() {
  const { data } = usePosts();

  return (
    <div>
      <ul>
        {data.map((post: any) => (
          <li key={post.title}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
