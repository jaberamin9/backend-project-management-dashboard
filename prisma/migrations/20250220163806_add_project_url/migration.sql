/*
  Warnings:

  - Made the column `description` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "projectUrl" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "description" SET NOT NULL;
