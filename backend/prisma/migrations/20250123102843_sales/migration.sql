/*
  Warnings:

  - You are about to alter the column `quantity` on the `Composition` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `value` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `stock` on the `RawMaterial` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `min_stock` on the `RawMaterial` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Composition` ADD COLUMN `salesProductId` INTEGER NULL,
    MODIFY `quantity` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Product` MODIFY `value` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `RawMaterial` MODIFY `stock` DOUBLE NOT NULL,
    MODIFY `min_stock` DOUBLE NOT NULL;

-- CreateTable
CREATE TABLE `SalesProduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unit` DOUBLE NOT NULL,
    `salesId` INTEGER NULL,
    `compositionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `day` DATETIME(3) NOT NULL,
    `month` INTEGER NOT NULL,
    `value` DOUBLE NOT NULL,
    `paymentMethod` ENUM('DINHEIRO', 'PIX', 'CREDITO_ELO', 'CREDITO_VISA', 'CREDITO_MASTERCARD', 'VOUCHER', 'DEBITO_ELO', 'DEBITO_VISA', 'DEBITO_MASTERCARD') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SalesProduct` ADD CONSTRAINT `SalesProduct_compositionId_fkey` FOREIGN KEY (`compositionId`) REFERENCES `Composition`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesProduct` ADD CONSTRAINT `SalesProduct_salesId_fkey` FOREIGN KEY (`salesId`) REFERENCES `Sales`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
