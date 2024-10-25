-- AlterTable
ALTER TABLE "group" ALTER COLUMN "lesson_start_time" DROP NOT NULL,
ALTER COLUMN "lesson_continuous" DROP NOT NULL,
ALTER COLUMN "group_stage_id" DROP NOT NULL,
ALTER COLUMN "room_number" DROP NOT NULL,
ALTER COLUMN "room_floor" DROP NOT NULL,
ALTER COLUMN "lessons_quant" DROP NOT NULL,
ALTER COLUMN "is_active" DROP NOT NULL;
