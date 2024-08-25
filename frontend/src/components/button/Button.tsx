import { Link } from "react-router-dom"

interface ButtonProps {
  data: {
    label: string;
    routerPath: string;
  }
}

export function Button({ data }: ButtonProps) {
  return (
    <Link to={`/${data.routerPath}`}>
      <button className="bg-indigo-600 hover:bg-indigo-700 transition w-36 text-white p-2 rounded-full">
        {data.label}
      </button>
    </Link>
  )
}

