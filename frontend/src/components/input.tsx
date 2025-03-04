import { ComponentProps } from "react";

// Composition Pattern
interface InputRootProps extends ComponentProps<'div'> {}

export function InputRoot(props: InputRootProps) {
    return <div className="flex-1 flex flex-col" {...props} />
}

interface LabelProps extends ComponentProps<'label'> {
    htmlFor: string
}

export function Label({ htmlFor, ...props}: LabelProps) {
    return <label htmlFor={htmlFor} className="w-auto font-medium text-gray-200 mb-1" {...props} />
}

interface InputFieldProps extends ComponentProps<'input'> {}

export function InputField(props: InputFieldProps) {
  return <input className="bg-[#121214] text-gray-200 p-3 rounded placeholder-slate-400 focus:outline-none focus:border-violet-800 focus:border-[1px] border-[1px] border-transparent" {...props} />;
}

export const Input = {
    Root: InputRoot,
    Label: Label,
    Field: InputField,
}