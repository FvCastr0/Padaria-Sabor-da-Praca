/*
  Warnings:

  - You are about to drop the `ProductRawMaterial` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToProductRawMaterial` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ProductRawMaterial` DROP FOREIGN KEY `ProductRawMaterial_rawMaterialId_fkey`;

-- DropForeignKey
ALTER TABLE `_ProductToProductRawMaterial` DROP FOREIGN KEY `_ProductToProductRawMaterial_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ProductToProductRawMaterial` DROP FOREIGN KEY `_ProductToProductRawMaterial_B_fkey`;

-- DropTable
DROP TABLE `ProductRawMaterial`;

-- DropTable
DROP TABLE `_ProductToProductRawMaterial`;

-- CreateTable
CREATE TABLE `Composition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `rawMaterialId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Composition` ADD CONSTRAINT `Composition_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Composition` ADD CONSTRAINT `Composition_rawMaterialId_fkey` FOREIGN KEY (`rawMaterialId`) REFERENCES `RawMaterial`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
