import useRandomData from "../hooks/queries/useRandomData.ts";

export default function LoginPage() {
  const { data } = useRandomData();

  return (
    <div>
      <h1>Login Page</h1>
      <div>{data?.value}</div>
    </div>
  );
}
