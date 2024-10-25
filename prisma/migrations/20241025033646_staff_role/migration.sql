-- CreateTable
CREATE TABLE "staff_role" (
    "staffId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "staff_role_pkey" PRIMARY KEY ("staffId","roleId")
);

-- AddForeignKey
ALTER TABLE "staff_role" ADD CONSTRAINT "staff_role_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff_role" ADD CONSTRAINT "staff_role_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
