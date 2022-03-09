-- CreateTable
CREATE TABLE `Color` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `colorHex` VARCHAR(255) NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Weather` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `indoorTemp` DECIMAL(6, 2) NOT NULL,
    `outdoorTemp` DECIMAL(6, 2) NOT NULL,
    `cpuTemp` DECIMAL(6, 2) NOT NULL,
    `pressure` DECIMAL(6, 2) NOT NULL,
    `humidity` DECIMAL(6, 2) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
