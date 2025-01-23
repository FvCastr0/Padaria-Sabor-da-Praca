/*
  Warnings:

  - You are about to drop the column `compositionId` on the `SalesProduct` table. All the data in the column will be lost.
  - Added the required column `productId` to the `SalesProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `SalesProduct` DROP FOREIGN KEY `SalesProduct_compositionId_fkey`;

-- DropIndex
DROP INDEX `SalesProduct_compositionId_fkey` ON `SalesProduct`;

-- AlterTable
ALTER TABLE `SalesProduct` DROP COLUMN `compositionId`,
    ADD COLUMN `productId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `SalesProduct` ADD CONSTRAINT `SalesProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
