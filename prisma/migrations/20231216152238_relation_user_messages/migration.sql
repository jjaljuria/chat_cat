/*
  Warnings:

  - Added the required column `idUser` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Conversation` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Message` ADD COLUMN `idUser` VARCHAR(191) NOT NULL,
    ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
