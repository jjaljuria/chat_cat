/*
  Warnings:

  - You are about to drop the `UserConversation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `UserConversation` DROP FOREIGN KEY `UserConversation_idConversation_fkey`;

-- DropForeignKey
ALTER TABLE `UserConversation` DROP FOREIGN KEY `UserConversation_idUser_fkey`;

-- AlterTable
ALTER TABLE `Conversation` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Message` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- DropTable
DROP TABLE `UserConversation`;

-- CreateTable
CREATE TABLE `_ConversationToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ConversationToUser_AB_unique`(`A`, `B`),
    INDEX `_ConversationToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ConversationToUser` ADD CONSTRAINT `_ConversationToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Conversation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ConversationToUser` ADD CONSTRAINT `_ConversationToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
