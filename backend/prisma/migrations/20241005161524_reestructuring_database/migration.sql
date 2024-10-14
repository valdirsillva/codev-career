/*
  Warnings:

  - You are about to drop the column `password_reset` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `dataOfBirth` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `companies` table. All the data in the column will be lost.
  - Added the required column `address` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `candidates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL
);
INSERT INTO "new_users" ("email", "id", "name", "password") SELECT "email", "id", "name", "password" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE TABLE "new_candidates" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cpf" TEXT,
    "gender" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "experiences" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "candidates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_candidates" ("cpf", "education", "experiences", "gender", "id") SELECT "cpf", "education", "experiences", "gender", "id" FROM "candidates";
DROP TABLE "candidates";
ALTER TABLE "new_candidates" RENAME TO "candidates";
CREATE TABLE "new_companies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cnpj" TEXT NOT NULL,
    "sector" TEXT,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "companies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_companies" ("cnpj", "description", "id", "sector") SELECT "cnpj", "description", "id", "sector" FROM "companies";
DROP TABLE "companies";
ALTER TABLE "new_companies" RENAME TO "companies";
CREATE UNIQUE INDEX "companies_cnpj_key" ON "companies"("cnpj");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
