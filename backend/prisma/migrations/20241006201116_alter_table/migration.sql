/*
  Warnings:

  - You are about to drop the column `location` on the `vacancies` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_vacancies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    CONSTRAINT "vacancies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_vacancies" ("companyId", "description", "id", "requirements", "salary", "title") SELECT "companyId", "description", "id", "requirements", "salary", "title" FROM "vacancies";
DROP TABLE "vacancies";
ALTER TABLE "new_vacancies" RENAME TO "vacancies";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
