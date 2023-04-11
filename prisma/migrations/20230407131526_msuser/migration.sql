/*
  Warnings:

  - Added the required column `msUserId` to the `MsAccount` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "MsUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MsAccount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idToken" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "expiresAt" INTEGER NOT NULL,
    "msUserId" TEXT NOT NULL,
    CONSTRAINT "MsAccount_msUserId_fkey" FOREIGN KEY ("msUserId") REFERENCES "MsUser" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_MsAccount" ("accessToken", "expiresAt", "id", "idToken", "refreshToken") SELECT "accessToken", "expiresAt", "id", "idToken", "refreshToken" FROM "MsAccount";
DROP TABLE "MsAccount";
ALTER TABLE "new_MsAccount" RENAME TO "MsAccount";
CREATE UNIQUE INDEX "MsAccount_msUserId_key" ON "MsAccount"("msUserId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
