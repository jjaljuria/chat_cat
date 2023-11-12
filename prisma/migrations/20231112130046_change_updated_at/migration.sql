-- AlterTable
ALTER TABLE `Conversation` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Message` ALTER COLUMN `updatedAt` DROP DEFAULT;
