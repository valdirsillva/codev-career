import { PrismaCompanyRepository } from "../repositories/prisma/PrismaCompanyRepository";

export interface CompanyProps {
  name: string;
  quantityEmployee?: string | undefined
  email: string
  cep?: string | undefined
  phone?: string | undefined
  city?: string | undefined
  road?: string | undefined
  state?: string | undefined
  cnpj: string
  description_text?: string | undefined
  password: string
}

export class CompanyModel {
  private props: CompanyProps;

  private repositoryCompany: PrismaCompanyRepository;

  constructor(props: CompanyProps) {
    this.repositoryCompany = new PrismaCompanyRepository()

    this.props = { ...props }
  }

  public set name(name: string) {
    this.props.name = name
  }

  public set quantityEmployee(quantityEmployee: string) {
    this.props.quantityEmployee = quantityEmployee;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public set cep(cep: string) {
    this.props.cep = cep;
  }

  public set phone(phone: string) {
    this.props.phone = phone;
  }

  public set city(city: string) {
    this.props.city = city;
  }

  public set state(state: string) {
    this.props.state = state;
  }

  public set road(road: string) {
    this.props.road = road;
  }

  public set cnpj(cnpj: string) {
    this.props.cnpj = cnpj;
  }

  public set description_text(description_text: string) {
    this.props.description_text = description_text;
  }

  public get name(): string {
    return this.props.name;
  }

  public get quantityEmployee(): string | undefined {
    return this.props.quantityEmployee;
  }

  public get email(): string | undefined {
    return this.props.email;
  }

  public get cep(): string | undefined {
    return this.props.cep;
  }

  public get phone(): string | undefined {
    return this.props.phone;
  }

  public get city(): string | undefined {
    return this.props.city;
  }

  public get state(): string | undefined {
    return this.props.state;
  }

  public get road(): string | undefined {
    return this.props.road;
  }

  public get cnpj(): string | undefined {
    return this.props.cnpj;
  }

  public get description_text(): string | undefined {
    return this.props.description_text;
  }

  public save(data: Pick<CompanyProps, "name" | "email" | "cnpj" | "password">) {
    return this.repositoryCompany.create(data)
  }

  public getCompanies() {
    return this.repositoryCompany.getAll();
  }
}