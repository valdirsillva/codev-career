

export function Stack({ data }: any) {
  return (
    <span className="flex p-2 min-[320px]:gap-2 md:gap-3 items-center">
      {data.map((stack: any) => {
        return (
          <span className="flex justify-center border-2 text-pink-700 font-medium border-gray-600 rounded-xl px-3" key={stack.id}>
            {stack}
          </span>
        )
      })}
    </span>
  )
}

