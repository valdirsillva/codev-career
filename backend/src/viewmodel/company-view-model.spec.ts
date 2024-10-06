// import { describe, it, expect, test } from "@jest/globals";

// import Fastify from "fastify";
// import { PrismaCompanyRepository } from "../repositories/prisma/prisma-company-repository";

// const app = Fastify({
//   logger: false,
// });

// describe("Register company", () => {
//   const instanceCompany = {
//     name: "",
//     cnpj: "",
//     quantityEmployee: "",
//     email: "",
//     cep: "",
//     phone: "",
//     city: "",
//     road: "",
//     state: "",
//   };

//   const data = {
//     name: "TESTE ok",
//     quantityEmployee: "23",
//     email: "cubo@devcast.com.br",
//     cep: "08022450",
//     phone: "(11) 9100-0010",
//     city: "Sao Paulo",
//     road: "Rua TRezentos e dois",
//     state: "SP",
//     cnpj: "11111111111111",
//     description_text: ''
//   };

//   const validateEmail = (email: any) => {
//     const re = /\S+@\S+\.\S+/;
//     return re.test(email);
//   };

//   // it("Check CNPJ exists in other company", async () => {
//   //   const newCompany = new PrismaCompanyRepository();
//   //   const expectedValue = await newCompany.checkCnpj(data);
//   //   expect(expectedValue).toBeFalsy();
//   // });

//   it("Check CNPJ is valid", () => {
//     expect(data["cnpj"]).toHaveLength(14);
//   });

//   it("Check phone number is valid", () => {
//     expect(data["phone"]).toContain("-");
//   });

//   it("Check email is valid ", () => {
//     expect(validateEmail(data["email"])).toBeTruthy();
//   });
// });
