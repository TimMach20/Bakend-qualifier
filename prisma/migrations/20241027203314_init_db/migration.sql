-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "url" TEXT,
    "image" TEXT,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);
