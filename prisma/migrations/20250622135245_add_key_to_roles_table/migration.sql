/*
  Warnings:

  - You are about to alter the column `last_login` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `invitation_expired_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `reset_expired_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `roles` ADD COLUMN `key` VARCHAR(10) NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `last_login` TIMESTAMP NULL,
    MODIFY `invitation_expired_at` TIMESTAMP NULL,
    MODIFY `reset_expired_at` TIMESTAMP NULL;
