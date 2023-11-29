/*
  Warnings:

  - You are about to alter the column `title` on the `issue` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(250)`.

*/
-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `issue` DROP FOREIGN KEY `Issue_assignedToUserId_fkey`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_userId_fkey`;

-- AlterTable
ALTER TABLE `issue` MODIFY `title` VARCHAR(250) NOT NULL;
