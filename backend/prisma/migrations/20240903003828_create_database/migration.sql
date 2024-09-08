-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "cnpj" TEXT NOT NULL,
    "quantityEmployee" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cep" TEXT,
    "phone" TEXT,
    "road" TEXT,
    "city" TEXT,
    "state" TEXT,
    "description_text" TEXT
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "job_title" TEXT NOT NULL,
    "job_companyId" TEXT NOT NULL,
    "job_quantity" TEXT NOT NULL,
    "technologies" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "modality" TEXT NOT NULL,
    "seniority" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    CONSTRAINT "jobs_job_companyId_fkey" FOREIGN KEY ("job_companyId") REFERENCES "companies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "password_reset" TEXT,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_cnpj_key" ON "companies"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
