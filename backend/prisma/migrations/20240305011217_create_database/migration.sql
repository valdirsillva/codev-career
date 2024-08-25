-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "cnpj" TEXT NOT NULL,
    "quantityEmployee" TEXT,
    "email" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "road" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "description_text" TEXT NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL,
    "job_title" TEXT NOT NULL,
    "job_companyId" TEXT NOT NULL,
    "job_quantity" TEXT NOT NULL,
    "technologies" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "modality" TEXT NOT NULL,
    "seniority" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "details" TEXT NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "password_reset" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_cnpj_key" ON "companies"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_job_companyId_fkey" FOREIGN KEY ("job_companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
