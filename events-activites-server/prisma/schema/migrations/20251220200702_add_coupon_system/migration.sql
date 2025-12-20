-- AlterTable
ALTER TABLE "events" ADD COLUMN     "couponActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "couponCode" TEXT,
ADD COLUMN     "couponDiscount" INTEGER;

-- AlterTable
ALTER TABLE "participents" ADD COLUMN     "couponApplied" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "couponCode" TEXT,
ADD COLUMN     "discountAmount" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "finalPrice" DOUBLE PRECISION,
ADD COLUMN     "originalPrice" DOUBLE PRECISION;
