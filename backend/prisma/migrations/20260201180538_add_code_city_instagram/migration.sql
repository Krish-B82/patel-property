/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "city" TEXT NOT NULL DEFAULT 'Vadodara',
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "instagram_video_url" TEXT,
ALTER COLUMN "bedrooms" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Property_code_key" ON "Property"("code");

-- CreateIndex
CREATE INDEX "Property_code_idx" ON "Property"("code");

-- CreateIndex
CREATE INDEX "Property_city_idx" ON "Property"("city");
