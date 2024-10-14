/*
  Warnings:

  - You are about to drop the column `summaryProfessional` on the `candidates` table. All the data in the column will be lost.

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
    "education" TEXT NOT NULL,
    "experiences" TEXT
);
INSERT INTO "new_candidates" ("cpf", "dataOfBirth", "education", "email", "experiences", "gender", "id", "name", "phoneNumber") SELECT "cpf", "dataOfBirth", "education", "email", "experiences", "gender", "id", "name", "phoneNumber" FROM "candidates";
DROP TABLE "candidates";
ALTER TABLE "new_candidates" RENAME TO "candidates";
CREATE TABLE "new_applications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vacancyId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "dateApplication" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "applications_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "vacancies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "applications_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_applications" ("candidateId", "id", "vacancyId") SELECT "candidateId", "id", "vacancyId" FROM "applications";
DROP TABLE "applications";
ALTER TABLE "new_applications" RENAME TO "applications";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
