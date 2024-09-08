/*
  Warnings:

  - You are about to drop the `jobs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `cep` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `description_text` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `quantityEmployee` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `road` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `companies` table. All the data in the column will be lost.
  - Added the required column `description` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sector` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "jobs";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "vacancies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    CONSTRAINT "vacancies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "candidates" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "experiences" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "applications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vacancyId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    CONSTRAINT "applications_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "vacancies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "applications_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "password_reset" TEXT,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'CANDIDATE'
);
INSERT INTO "new_users" ("email", "id", "name", "password", "password_reset") SELECT "email", "id", "name", "password", "password_reset" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE TABLE "new_companies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "cnpj" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_companies" ("cnpj", "id", "name") SELECT "cnpj", "id", "name" FROM "companies";
DROP TABLE "companies";
ALTER TABLE "new_companies" RENAME TO "companies";
CREATE UNIQUE INDEX "companies_cnpj_key" ON "companies"("cnpj");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
