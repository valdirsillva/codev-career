import { PrismaCompanyRepository } from "../repositories/prisma/PrismaCompanyRepository";

export interface CompanyProps {
  name: string;
  quantityEmployee: string;
  email: string;
  cep: string;
  phone: string;
  city: string;
  road: string;
  state: string;
  cnpj: string;
  description_text: string;
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

  public get quantityEmployee(): string | number {
    return this.props.quantityEmployee;
  }

  public get email() {
    return this.props.email;
  }

  public get cep() {
    return this.props.cep;
  }

  public get phone() {
    return this.props.phone;
  }

  public get city() {
    return this.props.city;
  }

  public get state() {
    return this.props.state;
  }

  public get road() {
    return this.props.road;
  }

  public get cnpj() {
    return this.props.cnpj;
  }

  public get description_text() {
    return this.props.description_text;
  }

  public save(data: CompanyProps) {
    return this.repositoryCompany.create(data);
  }

  public getCompanies() {
    return this.repositoryCompany.getAll();
  }
}