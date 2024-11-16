import { Check } from "lucide-react";

export function Description({ data }: any) {
  return (
    <>
      <ul className="mt-2">
        {data.map((req: any) => {
          return (
            <li className="flex flex-row gap-2" key={req}>
              <Check size={30} color="#463ebc" />
              {req}
            </li>
          )
        })}

      </ul>
    </>
  );
}
