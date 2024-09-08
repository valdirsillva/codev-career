import { Fragment } from "react";

export function Search() {
  return (
    <Fragment>
      <div className="flex flex-col text-gray-200">
        <label htmlFor="habilidades" className="font-medium mb-1">
          Habilidades
        </label>
        <select name="habilidade" className="bg-[#121214] text-gray-200 p-2 rounded focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600">
          <option value="php">PHP</option>
          <option value="javascript">JAVASCRIPT</option>
        </select>
      </div>

      <div className="flex flex-col mt-3 text-gray-200">
        <label htmlFor="cidade" className="font-medium mb-1">
          Cidade de empresa
        </label>
        <select name="cidade" className="bg-[#121214] text-gray-200 p-2 rounded focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600">
          <option value="sao_paulo" className="">São Paulo</option>
          <option value="rio_janeiro">Rio Janeiro</option>
        </select>
      </div>

      <div className="flex flex-col mt-3 text-gray-200">
        <label htmlFor="tipo_vaga" className="font-medium mb-1">
          Tipo de vaga
        </label>

        <div className="flex gap-2 mb-3 " aria-checked="true">
          <input type="checkbox" className="w-10 " />
          <span>Remoto</span>
        </div>

        <div className="flex gap-2">
          <input type="checkbox" className="w-10" />
          <span>Presencial</span>
        </div>
      </div>

      <div className="flex flex-col mt-10">
        <a
          href="#"
          className="flex justify-center bg-indigo-600 hover:bg-indigo-700 transition px-8 py-3 text-white rounded"
        >
          FILTRAR
        </a>
      </div>
    </Fragment>
  );
}
