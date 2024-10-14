/*
  Warnings:

  - Added the required column `education` to the `candidates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `candidates` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_candidates" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT,
    "dataOfBirth" TEXT,
    "phoneNumber" TEXT,
    "gender" TEXT NOT NULL,
    "summaryProfessional" TEXT,
    "education" TEXT NOT NULL,
    "experiences" TEXT NOT NULL
);
INSERT INTO "new_candidates" ("email", "experiences", "id", "name") SELECT "email", "experiences", "id", "name" FROM "candidates";
DROP TABLE "candidates";
ALTER TABLE "new_candidates" RENAME TO "candidates";
CREATE TABLE "new_companies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "cnpj" TEXT NOT NULL,
    "sector" TEXT,
    "description" TEXT
);
INSERT INTO "new_companies" ("cnpj", "description", "id", "name", "sector") SELECT "cnpj", "description", "id", "name", "sector" FROM "companies";
DROP TABLE "companies";
ALTER TABLE "new_companies" RENAME TO "companies";
CREATE UNIQUE INDEX "companies_cnpj_key" ON "companies"("cnpj");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
