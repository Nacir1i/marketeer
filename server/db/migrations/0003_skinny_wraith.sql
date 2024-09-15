ALTER TABLE "user" ADD COLUMN "facebook_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "password";--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_facebook_id_unique" UNIQUE("facebook_id");