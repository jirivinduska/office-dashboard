/*
  Warnings:

  - You are about to drop the column `name` on the `Settings` table. All the data in the column will be lost.
  - Added the required column `type` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Settings` DROP COLUMN `name`,
    ADD COLUMN `type` ENUM('FIRST_NAME', 'OTHER') NOT NULL;
