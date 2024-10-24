-- CreateTable
CREATE TABLE "lid_status" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "lid_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reason_lid" (
    "id" SERIAL NOT NULL,
    "reason_lid" TEXT NOT NULL,

    CONSTRAINT "reason_lid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "role_name" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "branch" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "call_number" TEXT NOT NULL,

    CONSTRAINT "branch_pkey" PRIMARY KEY ("id")
);
