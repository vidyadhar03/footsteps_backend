-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "authUserId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "origin" TEXT,
    "styleTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "totalKm" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalCountries" INTEGER NOT NULL DEFAULT 0,
    "earthRotations" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_authUserId_key" ON "UserProfile"("authUserId");
